{
	"translatorID": "03df2575-dbd9-49aa-9e58-1e6edd86d562",
	"translatorType": 4,
	"label": "JRC Publications Repository",
	"creator": "Philipp Zumstein",
	"target": "https?://(www\\.)?publications\\.jrc\\.ec\\.europa\\.eu/repository/(handle/|simple-search\\?|browse\\?)",
	"minVersion": "3.0",
	"maxVersion": null,
	"priority": 100,
	"inRepository": true,
	"browserSupport": "gcsibv",
	"lastUpdated": "2015-01-03 23:40:00"
}

/*
	***** BEGIN LICENSE BLOCK *****

	Copyright © 2014 Philipp Zumstein
	
	This file is part of Zotero.

	Zotero is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Zotero is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with Zotero. If not, see <http://www.gnu.org/licenses/>.

	***** END LICENSE BLOCK *****
*/


var mappingTable = {
	"Articles in Journals" : "journalArticle",
	"Articles in books" : "bookSection",
	"Books" : "book",
	"eBook" : "book",
	"Contributions to Conferences" : "conferencePaper",
	"JRC Reference Reports" : "report",
	"EUR - Scientific and Technical Research Reports" : "report",
	"PhD Theses" : "thesis"
}


function getSearchResults(doc, checkOnly) {
	var items = {};
	var found = false;
	var rows = ZU.xpath(doc, '//div[contains(@class, "discovery-result-results") or contains(@class, "panel-primary")]//table//a[contains(@href, "/repository/handle/")]');
	for (var i=0; i<rows.length; i++) {
		var href = rows[i].href;
		var title = ZU.trimInternal(rows[i].textContent);
		if (!href || !title) continue;
		if (checkOnly) return true;
		found = true;
		items[href] = title;
	}
	return found ? items : false;
}


function detectWeb(doc, url) {
	var type = ZU.xpath(doc, '//meta[@name="DC.type"]/@content');
	if (type.length>0) {
		if (mappingTable[type[0].value]) {
			return mappingTable[type[0].value];
		} else {//generic fallback
			Z.debug('Unrecognized item type: ' + type[0].value);
			return "journalArticle";
		}
	}
	if ( getSearchResults(doc, true) ) {
		return "multiple";
	}
}

//We need a different name for the same function, because of calling another translator inside scrape makes problems.
function detectWebHere(doc, url) {
	var type = ZU.xpath(doc, '//meta[contains(@name, "DC.type")]/@content');
	if (type.length>0) {
		if (mappingTable[type[0].textContent]) {
			return mappingTable[type[0].textContent];
		} else {//generic fallback
			Z.debug('Unrecognized item type: ' + type[0].textContent);
			return "journalArticle";
		}
	}
	if ( getSearchResults(doc, true) ) {
		return "multiple";
	}
}

function doWeb(doc, url) {
	if (detectWeb(doc, url) == "multiple") {
		Zotero.selectItems(getSearchResults(doc, false), function (items) {
			if (!items) {
				return true;
			}
			var articles = new Array();
			for (var i in items) {
				articles.push(i);
			}
			ZU.processDocuments(articles, scrape);
		});
	} else {
		scrape(doc, url);
	}
}

function scrape(doc, url) {

	var translator = Zotero.loadTranslator('web');
	translator.setTranslator('951c027d-74ac-47d4-a107-9c3069ab7b48');//https://github.com/zotero/translators/blob/master/Embedded%20Metadata.js
	translator.setDocument(doc);
	
	translator.setHandler('itemDone', function (obj, item) {
		
		if (item.title == item.title.toUpperCase()) {
			item.title = item.title[0] + item.title.substr(1).toLowerCase();//ZU.capitalizeTitle( item.title, true );
		}
		
		//The format of the authors in the meta-tags is very special (pattern = LASTNAME Firstname):
		//e.g. <meta name="DC.creator" content="DEL RIO GONZALEZ Pablo" xml:lang="en_GB">
		//We try to overwrite the creators with better splitting of lastName and firstName.
		var authors = ZU.xpath(doc, '//meta[@name="DC.creator" and @content]|//meta[@name="DC.contributor" and @content]');
		if (authors) {
			item.creators = [];
			for (var a=0; a<authors.length; a++) {
				var authorsText = authors[a].content;
				var authorsType = authors[a].name.substr(3);//either creator or contributer
				var authorParts = authorsText.split(' ');
				//distinguish between lastName (every letter is in uppercase) from firstName
				//but there might also be just initials (e.g. "D.") from the firstName
				var firstName = "";
				var lastName = "";
				var splitPos=0;
				while (splitPos<authorParts.length && authorParts[splitPos].toUpperCase() == authorParts[splitPos] && authorParts[splitPos].indexOf('.') == -1 && authorParts[splitPos].length>1) {
					authorParts[splitPos] = ZU.capitalizeTitle(authorParts[splitPos], true);
					splitPos++;
				}
				if (splitPos == authorParts.length && splitPos>1) {//guess: last part is firstName
					firstName = authorParts[splitPos-1];
					lastName = authorParts.slice(0,splitPos-1).join(' ')
				} else {
					firstName = authorParts.slice(splitPos).join(' ');
					lastName= authorParts.slice(0,splitPos).join(' ');
				}
				if (authorsType == "creator") {
					item.creators.push( {lastName:lastName.trim(), firstName:firstName.trim(), creatorType:"author" });
				} else {
					item.creators.push( {lastName:lastName.trim(), firstName:firstName.trim(), creatorType:"contributor" });
				}
				
			}
		}

		//volume, issue, pages
		var citation = ZU.xpathText(doc, '//meta[contains(@name, "DCTERMS.bibliographicCitation")]/@content');
		//e.g. GLOBAL ENVIRONMENTAL CHANGE-HUMAN AND POLICY DIMENSIONS vol. 23 no. 5 p. 892-901
		//e.g. EUROPEAN PHYSICAL JOURNAL C vol. 73 no. 3 p. 2330 [29 pages]
		if (citation) {
			var seperationPos = citation.lastIndexOf('vol.');
			if (seperationPos == -1) {
				seperationPos = citation.lastIndexOf('no.');
			}
			if (seperationPos == -1) {
				seperationPos = citation.lastIndexOf('p.');
			}
			
			if (seperationPos > -1) {
				item.publicationTitle = citation.substring(0,seperationPos).trim();
				citation = citation.substring(seperationPos);
				var volume = citation.match(/vol\. (\d+)/);
				if (!item.volume && volume) {
					item.volume = volume[1];
				}
				var issue = citation.match(/no\. (\d+)/);
				if (!item.issue && issue) {
					item.issue = issue[1];
				}
				var pages = citation.match(/p\. (\d+\s*-?\s*\d*)/);
				if (!item.pages && pages) {
					item.pages = pages[1];
				}
			} else {
				item.publicationTitle = citation;
			}
			if (item.publicationTitle == item.publicationTitle.toUpperCase() ) {
				item.publicationTitle = ZU.capitalizeTitle(item.publicationTitle, true );//item.publicationTitle[0] + item.publicationTitle.substr(1).toLowerCase();
			}
			
		}
		
		//The itemType is saved as a tag, which is not useful. Thus we delete it.
		//e.g. <meta name="citation_keywords" content="PhD Theses">
		item.tags = [];
		//e.g. <meta name="DC.description" content="JRC.H.5-Land Resources Management" xml:lang="en_GB">
		var tags = ZU.xpath(doc, '//meta[@name="DC.description"]');
		for (var t=0; t<tags.length; t++) {
			item.tags.push(tags[t].content);
			//if the tags will end wrongly in the extra field, we delete them
			item.extra = item.extra.replace(tags[t].content, '');
		}
		
		//Try to find a pdf if there is not already one attached to it.
		var pdfAttachment = false;
		for (var a=0; a<item.attachments.length; a++) {
			if (item.attachments[a].mimeType == "application/pdf") {
				pdfAttachment = true;
			}
		}
		if (!pdfAttachment) {
			var pdfUrl = ZU.xpath(doc, '//a[contains(@class, "btn") and contains(@href, ".pdf")]');
			if (pdfUrl.length) {
				item.attachments.push({
					"url": pdfUrl[0].href,
					"title": "Full Text PDF",
					"mimeType": "application/pdf"
				});
			} else {
				//If the fulltext is not available at this site, then we should not save the url in this field.
				delete item.url;
			}
			
		}
		
		item.complete();
		
	});
	
	translator.getTranslatorObject(function(trans) {
		
		//Calling detectWeb here on multiples, does only work for the first one?!
		//Z.debug( 'DETECTWEB = ' + detectWeb(doc, url) );//I guess this then tries (for the nth (n>1) entry) to use the detectWeb function form the called Metadata translator.
		//Z.debug( 'DETECTWEBHERE = ' + detectWebHere(doc, url) );//This always uses the correct function.
		trans.itemType = detectWebHere(doc, url);
		
		trans.addCustomFields({
			'DC.relation': 'archiveLocation' //JRC Number
		});
		
		trans.doWeb(doc, url);
	});
}/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "http://publications.jrc.ec.europa.eu/repository/handle/JRC81894",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Estimating the World’s Potentially Available Cropland Using a Bottom-up Approach",
				"creators": [
					{
						"lastName": "Lambin",
						"firstName": "Eric",
						"creatorType": "author"
					},
					{
						"lastName": "Gibbs",
						"firstName": "Holly",
						"creatorType": "author"
					},
					{
						"lastName": "Ferreira",
						"firstName": "Laerte Guimaraes",
						"creatorType": "author"
					},
					{
						"lastName": "Grau",
						"firstName": "Riccardo",
						"creatorType": "author"
					},
					{
						"lastName": "Mayaux",
						"firstName": "Philippe",
						"creatorType": "author"
					},
					{
						"lastName": "Meyfroidt",
						"firstName": "Patrick",
						"creatorType": "author"
					},
					{
						"lastName": "Morton",
						"firstName": "Douglas",
						"creatorType": "author"
					},
					{
						"lastName": "Rudel",
						"firstName": "Tom",
						"creatorType": "author"
					},
					{
						"lastName": "Gasparri",
						"firstName": "Ignacio",
						"creatorType": "author"
					},
					{
						"lastName": "Munger",
						"firstName": "Jacob",
						"creatorType": "author"
					}
				],
				"date": "2013",
				"DOI": "10.1016/j.gloenvcha.2013.05.005",
				"ISSN": "0959-3780",
				"abstractNote": "Previous estimates of the land area available for future cropland expansion relied on global-scale climate, soil and terrain data. They did not include a range of constraints and tradeoffs associated with land conversion. As a result, very large values of the global land reserve area have been estimated. Here, we define potentially available cropland (PAC) as the moderately to highly productive land that could be used in the coming years for rainfed farming, with low to moderate capital investments, and that is not forested, legally protected, or already intensively managed. This productive land is underutilized rather than unused as it has ecological or social functions. We also define potentially available cropland that accounts for trade-offs between gains in agricultural production and losses in ecosystem and social services from intensified agriculture (PACt), to include only the PAC that would entail low ecological and social costs with conversion to cropland. The objective of this study is to reconceptualize and then estimate the size and geographic distribution of PAC and PACt. In contrast to previous studies, we adopt a “bottom-up” approach by analyzing detailed, fine scale observations and expert knowledge for six countries or regions that are often assumed to include a large reserve of PAC. We conclude first that there is substantially less potential additional cropland than is generally assumed once constraints and trade offs are taken into account, and secondly that converting land is always associated with significant social and ecological costs. There are few remaining places with “free and easy” lands.",
				"archiveLocation": "JRC81894",
				"issue": "5",
				"language": "ENG",
				"libraryCatalog": "publications.jrc.ec.europa.eu",
				"pages": "892-901",
				"publicationTitle": "Global Environmental Change-Human and Policy Dimensions",
				"volume": "23",
				"attachments": [
					{
						"title": "Snapshot"
					}
				],
				"tags": [
					"JRC.H.5-Land Resources Management"
				],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "http://publications.jrc.ec.europa.eu/repository/handle/JRC56837",
		"items": [
			{
				"itemType": "book",
				"title": "Eco-innovation: When Sustainability and Competitiveness Shake Hands",
				"creators": [
					{
						"lastName": "Carrillo Hermosilla",
						"firstName": "Javier",
						"creatorType": "author"
					},
					{
						"lastName": "Del Rio Gonzalez",
						"firstName": "Pablo",
						"creatorType": "author"
					},
					{
						"lastName": "Könnölä",
						"firstName": "Timo-Topias Totti",
						"creatorType": "author"
					}
				],
				"date": "2009",
				"ISBN": "978-0-230-20206-1",
				"abstractNote": "Eco-Innovation considers the impact economic activities have on our environmental surroundings whilst exploring new ways towards more sustainable development. The concept of eco-innovation is addressed with regard to competitiveness and sustainability from the viewpoints of both business leaders and policy-makers in this thought-provoking new book.",
				"archiveLocation": "JRC56837",
				"language": "ENG",
				"libraryCatalog": "publications.jrc.ec.europa.eu",
				"publisher": "Palgrave-McMillan",
				"shortTitle": "Eco-innovation",
				"attachments": [
					{
						"title": "Snapshot"
					}
				],
				"tags": [
					"JRC.DDG.J.3-Knowledge for Growth"
				],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "http://publications.jrc.ec.europa.eu/repository/handle/111111111/8",
		"items": "multiple"
	},
	{
		"type": "web",
		"url": "http://publications.jrc.ec.europa.eu/repository/simple-search?location=%2F&query=&rpp=10&sort_by=dc.date.available_dt&order=desc",
		"items": "multiple"
	},
	{
		"type": "web",
		"url": "http://publications.jrc.ec.europa.eu/repository/browse?type=author&value=SCHWALBACH+Peter",
		"items": "multiple"
	},
	{
		"type": "web",
		"url": "http://publications.jrc.ec.europa.eu/repository/handle/JRC34345",
		"items": [
			{
				"itemType": "thesis",
				"title": "Tropical Forest Mapping at Regional Scale using the GRFM SAR Mosaics over Amazon in South America",
				"creators": [
					{
						"lastName": "Sgrenzaroli",
						"firstName": "Matteo",
						"creatorType": "author"
					},
					{
						"lastName": "Hoekman",
						"firstName": "D. H.",
						"creatorType": "author"
					},
					{
						"lastName": "De Grandi",
						"firstName": "Gianfranco",
						"creatorType": "contributor"
					}
				],
				"date": "2006",
				"abstractNote": "Main focus of the work described in this thesis is on the estimation of tropical\nvegetation cover using as data source continental scale Synthetic Aperture Radar\n(SAR) mosaics at 100 m spatial resolution. These radar mosaics were acquired over\nthe South America tropical belt in a spatially and temporally contiguous way by the\nNational Agency for Space Development of Japan (NASDA) JERS-1 instrument in\nthe context of the Global Rain Forest Mapping (GRFM) project. Raw data were\nprocessed by the NASA Alaska SAR Facility (ASF). Mosaics were assembled by the\nCalifornia Institute of Technology Jet Propulsion Laboratory (JPL).\nThe techniques historically adopted for forest monitoring are introduced in\nChapter 1, emphasizing how earth observations by satellite provide a unique\ntechnology to acquire quantitative information on forest ecosystems at regional scale.\nSeveral remote sensing initiatives were launched in the early 1990 s for forest\nmonitoring at regional/global scale. Positive and negative aspects of these approaches\nare discussed. From this analysis the rationale for a more intensive usage of SAR\nremote sensing emerges together with the technical problems that historically\nhindered SAR usage for global scale problems. The GRFM project can be considered\nthe first international endeavor that has overcome these technical constraints.",
				"archiveLocation": "JRC34345",
				"language": "ENG",
				"libraryCatalog": "publications.jrc.ec.europa.eu",
				"thesisType": "PhD Theses",
				"university": "JRC",
				"url": "http://publications.jrc.ec.europa.eu/repository/handle/111111111/29540",
				"attachments": [
					{
						"title": "Full Text PDF",
						"mimeType": "application/pdf"
					},
					{
						"title": "Snapshot"
					}
				],
				"tags": [
					"JRC.H.5-Land Resources Management"
				],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "http://publications.jrc.ec.europa.eu/repository/handle/JRC80762",
		"items": [
			{
				"itemType": "conferencePaper",
				"title": "Cyclostationary Feature Analysis of CEN-DSRC for Cognitive Vehicular Networks",
				"creators": [
					{
						"lastName": "Sithamparanathan",
						"firstName": "Kandeepan",
						"creatorType": "author"
					},
					{
						"lastName": "Baldini",
						"firstName": "Gianmarco",
						"creatorType": "author"
					},
					{
						"lastName": "Dieter",
						"firstName": "Smely",
						"creatorType": "author"
					}
				],
				"date": "2013",
				"DOI": "10.1109/IVS.2013.6629473",
				"ISBN": "978-1-4673-2754-1",
				"abstractNote": "Cognitive vehicular networks provide the necessary intelligence for vehicular communication networks in order to optimally utilize the limited resources and maximize the performance. One of the important functions of cognitive networks is to learn the radio environment by means of detecting and identifying existing radios. In this context we use the cyclostationarity features of dedicated short range communication (DSRC) signals to blindly detect them in the environment. We present experimental results on the cyclostationarity properties of DSRC wireless transmissions considering the CEN (European) standards for both uplink and downlink signals. By performing\ncyclostationarity analysis we compute the cyclic power spectrum (CPS) of the CEN DSRC signals which is then used for detecting\nthe presence of the CEN DSRC radios. We obtain CEN DSRC signals from experiments and use the recorded data to perform post-signal analysis to determine the detection performance. The probability of false alarm and the probability of missed detection are computed and the results are presented for different detection strategies. Results show that the cyclostationarity feature based detection can be robust compared to the well known energy based technique for low signal to noise ratio levels.",
				"archiveLocation": "JRC80762",
				"language": "ENG",
				"libraryCatalog": "publications.jrc.ec.europa.eu",
				"pages": "214-219",
				"proceedingsTitle": "Proceedings of 2013 IEEE Intelligent Vehicles Symposium",
				"publisher": "IEEE",
				"attachments": [
					{
						"title": "Snapshot"
					}
				],
				"tags": [
					"JRC.G.7-Digital Citizen Security"
				],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/