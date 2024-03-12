import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  Button,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Drawer,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
} from "@chakra-ui/react";
import { sendToBackground } from "@plasmohq/messaging";

import { ChatPanel } from "./Chatpanel";
import { ChatIcon } from "../Icons/ChatIcon";
import { HistoryIcon } from "../Icons/HistoryIcon";
import { SearchBar } from "./Searchbar/SearchBar";
import { MoreIcon } from "../Icons/MoreIcon";

import "./Sidepanel.css";

export const Sidepanel = ({
  openDrawer,
  openBrainModal,
  setOpenDrawer,
  setOpenBrainModal,
  closeDrawerOpenChat,
}: {
  openDrawer: boolean;
  openBrainModal: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  setOpenBrainModal: Dispatch<SetStateAction<boolean>>;
  closeDrawerOpenChat: () => void;
}) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const initiateFirebaseMessage = async () => {
    console.log("ext id >>>", chrome.runtime.id);

    const resp = await sendToBackground({
      name: "ping",
      body: {
        id: 123,
      },
    });
    console.log("resp >>> ", resp);
    // chrome.runtime.sendMessage({ target: "login-request" });
    // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //   console.log("message received from background script");
    //   console.log(request);
    //   // switch (request.target) {
    //   //   case "login-response":
    //   //     console.log("login");
    //   //     console.log(request.user);
    //   //     break;
    //   //   default:
    //   //     console.log("invalid login request");
    //   //     break;
    //   // }
    // });
  };

  return (
    <Drawer
      isOpen={openDrawer}
      placement="right"
      onClose={() => setOpenDrawer(false)}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader
          bgColor="green"
          color="white"
          className="side-panel-header"
        >
          Gistrr
          <Box
            className="more-icon"
            onClick={() => setOpenBrainModal(!openBrainModal)}
          >
            <MoreIcon />
          </Box>
        </DrawerHeader>
        <DrawerBody>
          <Tabs align="center" isFitted={true} marginTop={4}>
            <TabList>
              <Tab onClick={() => setTabIndex(0)}>
                <Box className="tab-header">
                  <Box>
                    <ChatIcon />
                  </Box>
                  <Box>Chat</Box>
                </Box>
              </Tab>
              <Tab onClick={() => setTabIndex(1)}>
                <Box className="tab-header">
                  <Box>
                    <HistoryIcon />
                  </Box>
                  <Box>History</Box>
                </Box>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel paddingLeft={0} paddingRight={0}>
                <SearchBar />
                <ChatPanel closeDrawerOpenChat={closeDrawerOpenChat} />
              </TabPanel>
              <TabPanel paddingLeft={0} paddingRight={0}>
                <SearchBar />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
        <DrawerFooter>
          {tabIndex === 0 && (
            <Button colorScheme="blue" onClick={initiateFirebaseMessage}>
              Sign in to Google
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
