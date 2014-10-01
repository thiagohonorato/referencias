
C_LAUNCH_SUCCESS = 0;
C_STARTING_SHELL = 7;
C_INSTALLATION_FAILED = 20;

C_UNKNOWN_KEY=31;
C_LAUNCH_ERROR = 30;
C_LAUNCH_PENDING = 33;

C_INSTALL_PENDING = 100;
C_APPLET_NOT_LOADED = 101;
C_INSTALLATION_TIMEDOUT = 102;

g_msg_retrieve_toc = "Retrieving table of contents ... please wait.";
g_msg_show_toc = "Table of Contents";
g_msg_hide_toc = "Hide Table of Contents";
g_msg_no_toc = "Sorry, no table of contents available";
g_msg_first_hit = "Go to the first occurrence of the search term in this chapter";
g_msg_first_page = "Go to the first page of this chapter";
g_label_rank = "Rank";
g_label_chapter = "Chapter";
g_msg_starting_ebrary = "<b>Starting the ebrary experience.</b><br/><br/><b>Please be patient.</b>";
g_msg_popup_blocker="We're sorry, an error has occurred trying to satisfy your  request. It is likely you can resolve this problem.\n\nPlease turn off any \"pop-up blockers\" and try again for a more detailed message regarding the problem and how to resolve it.\n\n Thank you";
g_warning_bookshelf_login_required="In order to add a book to your bookshelf you must be signed in.\nPlease sign-in.";
g_doc_added_to_bookshelf="This document has been added to your bookshelf.";

msg_array = new Array();

msg_array[1] = "Checking to see if you have already installed the ebrary Reader.";
msg_array[2] = "Waiting for user permission to install the ebrary Reader.";
msg_array[3] = "The ebrary Reader is being installed now.";
msg_array[4] = "Please read and agree to the license agreement before proceeding.";
msg_array[5] = "The ebrary Reader is being downloaded now.";
msg_array[6] = "Installing the Java Virtual Machine. This may take a minute.";
msg_array[7] = "Starting the ebrary Reader shell.";
msg_array[8] = "Connecting to ebrary Reader shell.";
msg_array[9] = "Uninstalling ebrary Reader.";
msg_array[10] = "Waiting for another process to install.";

msg_array[C_INSTALLATION_FAILED] = "Sorry, ebrary Reader installation failed [code: ";

msg_array[21] = "The ebrary Reader is not installed because you chose not to install it. Refresh this page if you would like to try again.";
msg_array[22] = "Cannot start ebrary Reader shell.";
msg_array[23] = "An unexpected installation error has occurred.";
msg_array[24] = "We were unable to download ebrary Reader software.";
msg_array[25] = "Additional file permissions are needed to install the ebrary Reader. Please try again from an 'Admin' account.";
msg_array[26] = "The Java Virtual Machine Installation has failed.";
msg_array[27] = "Because you have declined license agreement the ebrary Reader cannot be installed. Please reload this page and try again.";
msg_array[28] = "We would like to install the ebrary Reader but do not have the necessary permissions. Please reload this page and make sure you click 'Trust' in the authentication dialog.";
msg_array[29] = "Your ebrary installation is complete, but you must install Java 1.6 or later to use ebrary client software.";

msg_array[136] = "Your Java installation needs to be updated.";

msg_array[C_LAUNCH_ERROR] = "There was an error opening your document [code: ";
msg_array[C_LAUNCH_PENDING] = "Please be patient, we are in the process of opening your document.";

msg_array[41] = "Because you have declined license agreement we cannot show you the document. Please refresh this web page, then read and agree to the license.";
msg_array[42] = "The Document service is unavailable, this should be temporary. Please try again later.";
msg_array[43] = "The Server unresponsive right now. Please try again later.";
msg_array[44] = "Timed out while trying to open the document. Please refresh this page and try again.";
msg_array[45] = "Session unavailable. Please refresh this page and try again.";
msg_array[46] = "Invalid parameters for open document request. (Internal error.) Please refresh this page and try again.";
msg_array[47] = "An Unexpected error has occurred. Please refresh this page and try again.";

msg_array[C_INSTALL_PENDING] = "Please be patient, we will automatically open your document when it is ready. [code: ";
msg_array[C_APPLET_NOT_LOADED] = "The Applet has not loaded properly. You may reload the page to try again, or try again later.";
msg_array[C_INSTALLATION_TIMEDOUT] = "The ebrary Reader installation has taken too long. You may reload the page to try again, or try again later.";
