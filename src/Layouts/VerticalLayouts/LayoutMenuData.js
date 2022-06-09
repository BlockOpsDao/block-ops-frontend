import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Navdata = () => {
    const history = useHistory();
    //state data
    const [isDashboard, setIsDashboard] = useState(false);
    const [isListProjectsPage, setIsListProjectsPage] = useState(false);
    const [isSubmitSolutionPage, setIsSubmitSolutionPage] = useState(false);
    const [isYourSubmissionsPage, setIsYourSubmissionsPage] = useState(false);
    const [isAllProjectsPage, setIsAllProjectsPage] = useState(false);
    const [isInformationPage, setIsInformationPage] = useState(false);

    const [isApps, setIsApps] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isCreateProject, setIsCreateProject] = useState(false);
    const [isPages, setIsPages] = useState(false);
    const [isBaseUi, setIsBaseUi] = useState(false);
    const [isAdvanceUi, setIsAdvanceUi] = useState(false);
    const [isForms, setIsForms] = useState(false);
    const [isTables, setIsTables] = useState(false);
    const [isCharts, setIsCharts] = useState(false);
    const [isIcons, setIsIcons] = useState(false);
    const [isMaps, setIsMaps] = useState(false);
    const [isMultiLevel, setIsMultiLevel] = useState(false);
    const [iscurrentState, setIscurrentState] = useState('Dashboard');

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
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState !== 'Dashboard') {
            setIsDashboard(false);
        }
        if (iscurrentState !== 'ListProjectsPage') {
            setIsListProjectsPage(false);
        }
        if (iscurrentState !== 'SubmitSolutionsPage') {
            setIsSubmitSolutionPage(false);
        }
        if (iscurrentState !== 'YourSubmissionsPage') {
            setIsYourSubmissionsPage(false);
        }
        if (iscurrentState !== 'AllProjectsPage') {
            setIsAllProjectsPage(false);
        }
        if (iscurrentState !== 'InformationPage') {
            setIsInformationPage(false)
        }
        if (iscurrentState !== 'Apps') {
            setIsApps(false);
        }
        if (iscurrentState !== 'Auth') {
            setIsAuth(false);
        }
        if (iscurrentState !== 'CreateProject') {
            setIsCreateProject(false);
        }
        if (iscurrentState !== 'Pages') {
            setIsPages(false);
        }
        if (iscurrentState !== 'BaseUi') {
            setIsBaseUi(false);
        }
        if (iscurrentState !== 'AdvanceUi') {
            setIsAdvanceUi(false);
        }
        if (iscurrentState !== 'Forms') {
            setIsForms(false);
        }
        if (iscurrentState !== 'Tables') {
            setIsTables(false);
        }
        if (iscurrentState !== 'Charts') {
            setIsCharts(false);
        }
        if (iscurrentState !== 'Icons') {
            setIsIcons(false);
        }
        if (iscurrentState !== 'Maps') {
            setIsMaps(false);
        }
        if (iscurrentState !== 'MuliLevel') {
            setIsMultiLevel(false);
        }
        if (iscurrentState === 'Widgets') {
            history.push("/widgets");
            document.body.classList.add('twocolumn-panel');
        }
        if (iscurrentState === 'Landing') {
            history.push("/landing");
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isListProjectsPage,
        isSubmitSolutionPage,
        isYourSubmissionsPage,
        isAllProjectsPage,
        isInformationPage,
        isApps,
        isCreateProject,
        isAuth,
        isPages,
        isBaseUi,
        isAdvanceUi,
        isForms,
        isTables,
        isCharts,
        isIcons,
        isMaps,
        isMultiLevel
    ]);

    const menuItems = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "maindashboard",
            label: "Dashboard",
            icon: "ri-dashboard-2-line",
            link: "/dashboard",
            stateVariables: isDashboard,
            click: function (e) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState('Dashboard');
                updateIconSidebar(e);
            },
        },
        {
            id: "allprojects",
            label: "All Projects",
            icon: "ri-file-list-2-fill",
            link: "/all-projects",
            stateVariables: isAllProjectsPage,
            click: function (e) {
                e.preventDefault();
                setIsAuth(!isAllProjectsPage);
                setIscurrentState('AllProjectsPage');
                updateIconSidebar(e);
            },
        },
        {
            label: "Create",
            isHeader: true,
        },
        {
            id: "createproject",
            label: "Create Project",
            icon: "ri-pages-line",
            link: "/create-project",
            click: function (e) {
                e.preventDefault();
                setIsAuth(!isCreateProject);
                setIscurrentState('CreateProject');
                updateIconSidebar(e);
            },
            stateVariables: isCreateProject,
        },
        {
            id: "submitsolutionpage",
            label: "Submit Solution",
            icon: "ri-check-fill",
            link: "/submit-solution",
            click: function (e) {
                e.preventDefault();
                setIsAuth(!isSubmitSolutionPage);
                setIscurrentState('SubmitSolutionPage');
                updateIconSidebar(e);
            },
            stateVariables: isSubmitSolutionPage,
        },
        {
            label: "Review",
            isHeader: true,
        },
        {
            id: "listprojectspage",
            label: "Your Projects",
            icon: "ri-table-line",
            link: "/list-projects",
            click: function (e) {
                e.preventDefault();
                setIsAuth(!isListProjectsPage);
                setIscurrentState('ListProjectsPage');
                updateIconSidebar(e);
            },
            stateVariables: isListProjectsPage,
        },
        {
            id: "yoursubmissionspage",
            label: "Your Submissions",
            icon: "ri-newspaper-fill",
            link: "/your-submissions",
            click: function (e) {
                e.preventDefault();
                setIsAuth(!isYourSubmissionsPage);
                setIscurrentState('YourSubmissionsPage');
                updateIconSidebar(e);
            },
            stateVariables: isYourSubmissionsPage,
        },
        {
            label: "Information",
            isHeader: true,
        },
        {
            id: "informationpage",
            label: "More Info",
            icon: "ri-file-info-fill",
            link: "/info",
            click: function (e) {
                e.preventDefault();
                setIsAuth(!isInformationPage);
                setIscurrentState('InformationPage');
                updateIconSidebar(e);
            },
            stateVariables: isInformationPage,
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;