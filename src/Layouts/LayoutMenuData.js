import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedinUser } from "../helpers/api_helper";

//Import Icons
import FeatherIcon from "feather-icons-react";
import { useSelector } from "react-redux";

const Navdata = () => {
  const history = useNavigate();

  // const menuDataOfUser = useSelector((state) => state.Login.user.menus);
  const userData = getLoggedinUser();
  const menuDataOfUser = userData.data.menus;

  //state data

  const [isManagement, setIsManagement] = useState(false);

  const [isClient, setIsClient] = useState(false);

  const [isWork, setIsWork] = useState(false);

  const [isReports, setIsReports] = useState(false);

  const [isSettings, setIsSettings] = useState(false);

  const [isCenters, setIsCenters] = useState(false);

  const [isDashboard, setIsDashboard] = useState(false);

  const [isApplications, setIsApplications] = useState(false);

  const [isCalls, setIsCalls] = useState(false);

  const [isUploads, setIsUploads] = useState(false);

  //
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Home");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");

    // if (iscurrentState !== "AdminTools") {
    //   setIsAdminTools(false);
    // }
    if (iscurrentState !== "Settings") {
      setIsSettings(false);
    }
    if (iscurrentState !== "Management") {
      setIsManagement(false);
    }

    if (iscurrentState !== "Client") {
      setIsClient(false);
    }

    if (iscurrentState !== "Work") {
      setIsWork(false);
    }

    if (iscurrentState !== "Reports") {
      setIsReports(false);
    }
    // if (iscurrentState !== "LeadManagement") {
    //   setIsLeadManagement(false);
    // }
    if (iscurrentState !== "Centers") {
      setIsCenters(false);
    }
    // if (iscurrentState !== "Payments") {
    //   setIsPayments(false);
    // }
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Applications") {
      setIsApplications(false);
    }
    if (iscurrentState !== "Calls") {
      setIsCalls(false);
    }
    if (iscurrentState !== "Uploads") {
      setIsUploads(false);
    }

    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
  }, [
    history,
    iscurrentState,
    // isAdminTools,
    isSettings,
    isManagement,
    isClient,
    isWork,
    isReports,
    // isLeadManagement,
    isCenters,
    // isPayments,
    isDashboard,
    isApplications,
    isCalls,
    isUploads,
    isAuth,
    isPages,
  ]);

  const parentMenuStates = {
    // AdminTools: isAdminTools,
    Management: isManagement,
    Client: isClient,
    Work: isWork,
    Reports: isReports,
    Settings: isSettings,
    Centers: isCenters,
    // LeadManagement: isLeadManagement,
    // Payments: isPayments,
    Dashboard: isDashboard,
    Applications: isApplications,
    Calls: isCalls,
    Uploads: isUploads,
  };

  const handleClick = (menuLabelId) => {
    return function (e) {
      e.preventDefault();
      switch (menuLabelId) {
        // case "AdminTools":
        //   setIsAdminTools(!isAdminTools);
        //   setIscurrentState(menuLabelId);
        //   updateIconSidebar(e);
        case "Management":
          setIsManagement(!isManagement);
          setIscurrentState(menuLabelId);
          updateIconSidebar(e);
        case "Client":
          setIsClient(!isClient);
          setIscurrentState(menuLabelId);
          updateIconSidebar(e);
        case "Work":
          setIsWork(!isWork);
          setIscurrentState(menuLabelId);
          updateIconSidebar(e);
        case "Reports":
          setIsReports(!isReports);
          setIscurrentState(menuLabelId);
          updateIconSidebar(e);
        case "Settings":
          setIsSettings(!isSettings);
          setIscurrentState(menuLabelId);
          updateIconSidebar(e);
        // case "LeadManagement":
        //   setIsLeadManagement(!isLeadManagement);
        //   setIscurrentState(menuLabelId);
        //   updateIconSidebar(e);
        case "Centers":
          setIsCenters(!isCenters);
          setIscurrentState(menuLabelId);
          updateIconSidebar(e);
        // case "Payments":
        //   setIsPayments(!isPayments);
        //   setIscurrentState(menuLabelId);
        //   updateIconSidebar(e);
        case "Dashboard":
          setIsDashboard(!isDashboard);
          setIscurrentState(menuLabelId);
          updateIconSidebar(e);
        case "Applications":
          setIsApplications(!isApplications);
          setIscurrentState(menuLabelId);
          updateIconSidebar(e);
        case "Calls":
          setIsCalls(!isCalls);
          setIscurrentState(menuLabelId);
          updateIconSidebar(e);
        case "Uploads":
          setIsUploads(!isUploads);
          setIscurrentState(menuLabelId);
          updateIconSidebar(e);
      }
    };
  };

  const dynamicMenuData = menuDataOfUser?.map((menu) => {
    // menuLableId me "label" ki spelling galat hai database me glt thi to testing ke liye galat likh kar hi check kr rha
    const updatedMenu = {
      ...menu,
      icon: <FeatherIcon icon={menu.icon} className="icon-dual" />,
      stateVariables: parentMenuStates[menu.menuLableId],
      click: handleClick(menu.menuLableId),
    };
    return updatedMenu;
  });

  // menuLableId me "label" ki spelling galat hai database me glt thi to testing ke liye galat likh kar hi check kr rha
  return <React.Fragment>{dynamicMenuData}</React.Fragment>;
};

export default Navdata;
