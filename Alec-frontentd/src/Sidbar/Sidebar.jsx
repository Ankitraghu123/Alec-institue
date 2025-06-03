import React, { useState, useEffect } from 'react';
import {
  FiHome, FiBook, FiLayers, FiImage, FiHelpCircle, FiMail, FiChevronLeft,
  FiChevronRight, FiSettings, FiLogOut, FiUser, FiX, FiMenu,
  FiChevronDown, FiChevronUp, FiCalendar, FiUsers, FiAward,
  FiBookOpen, FiFileText, FiStar, FiLink
} from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (!isMobileView) setMobileOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const toggleSidebar = () => setCollapsed(prev => !prev);
  const toggleMobileMenu = () => setMobileOpen(prev => !prev);

  const handleDropdown = (itemName) => {
    setOpenDropdowns(prev => ({ ...prev, [itemName]: !prev[itemName] }));
  };

  const menuItems = [
    { name: 'Dashboard', to: '/dashboard', icon: <FiHome /> },
    {
      name: 'Courses', icon: <FiBookOpen />, subItems: [
        { name: 'My Courses', to: '/courses' },
        { name: 'All Courses', to: '/allcourse' },
      ]
    },
    {
      name: 'Category', icon: <FiLayers />, subItems: [
        { name: 'Category', to: '/categories' }
      ]
    },
    {
      name: 'Banner', icon: <FiImage />, subItems: [
        { to: '/banner', name: 'Banner' },
        { to: '/allbanner', name: 'All Banner' },

      ]
    },


        {
      name: 'Blogs', icon: <FiImage />, subItems: [
        { to: '/blog', name: 'Add Blog' },

        { to: '/blogdisplay', name: 'Blog detail' },

      ]
    },
    {
      name: 'Enquiry', icon: <FiHelpCircle />, subItems: [
        { to: '/allquerydisplay', name: 'Call Back Query' },
        { name: 'CallbackPop', to: '/callbackpop' },
        { to: '/enroll', name: 'Courses Enroll Details' },
        { to: '/enquirydisplay', name: 'Student Enquiry' },
        { to: '/contactdisplay', name: 'Contact Enquiry' },

        
      ]
    },


      {
      name: 'WhatsNew', icon: <FiHelpCircle />, subItems: [
      

        { to: '/whatsnew', name: 'WhatsNew' },
        { to: '/whatsnewdisplay', name: 'WhatsNew Display' }

      ]
    },
    {
      name: 'Event', icon: <FiCalendar />, subItems: [
        { to: '/event', name: 'Event' },
        { to: '/eventdisplay', name: 'EventShow' },
    
      ]
    },


        {
      name: 'YouTube Videos', icon: <FiCalendar />, subItems: [
        { to: '/url', name: 'URL Create' },
        { to: '/urlshow', name: 'URL Show' },
      ]
    },
    {
      name: 'All member', icon: <FiUsers />, subItems: [
        { name: 'Team member', to: '/member' },
        { name: 'All member', to: '/memberdisplay' },
      ]
    },
    {
      name: 'Judgement', icon: <FiAward />, subItems: [
        { name: 'Judgement', to: '/judement' },
        { name: 'JudgementShow', to: '/judementshow' },
      ]
    },

    {
      name: 'Test Series', icon: <FiFileText />, subItems: [
        { name: 'pre test', to: '/test' },
        { name: 'main test', to: '/main' },
        { name: 'Pre Show', to: '/predisplay' },
        { name: 'Main Show', to: '/maindisplay' },
      ]
    },
    {
      name: 'Why Choose', icon: <FiStar />, subItems: [
        { name: 'WhyChoose', to: '/choose' },
        { name: 'WhyChoose Show', to: '/choosedisplay' },
        { name: 'Syllabus', to: '/syllabus' },
        { name: 'SyllabusShow', to: '/syllabusdisplay' },
      ]
    },
    {
      name: 'Success Story', icon: <FiBook />, subItems: [
        { name: 'Success Story', to: '/sucessStory' },
        { name: 'Story Display', to: '/sucessStorydisplay' },
      ]
    },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      {isMobile && (
        <button onClick={toggleMobileMenu} className="fixed z-50 top-4 left-4 p-2 rounded-md bg-gray-800 text-white shadow-lg">
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div className={`
        flex flex-col h-screen bg-gray-900 text-white transition-all duration-300
        ${collapsed ? 'w-20' : 'w-64'}
        ${isMobile ? (mobileOpen ? 'fixed z-40 w-64' : 'hidden') : ''}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {!collapsed && <h1 className="text-lg font-bold tracking-wider">Aashayein Judiciary</h1>}
          {!isMobile && (
            <button onClick={toggleSidebar} className="p-1 rounded hover:bg-gray-700">
              {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
            </button>
          )}
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
          <nav className="py-2">
            <ul className="space-y-1">
              {menuItems.map(item => (
                <li key={item.name}>
                  {item.subItems ? (
                    <div className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition
                      ${activeItem === item.to ? 'bg-gray-700' : ''}`}
                      onClick={() => handleDropdown(item.name)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{item.icon}</span>
                        {!collapsed && <span>{item.name}</span>}
                      </div>
                      {item.subItems && !collapsed && (
                        <span>
                          {openDropdowns[item.name] ? <FiChevronUp /> : <FiChevronDown />}
                        </span>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.to}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition
                        ${activeItem === item.to ? 'bg-gray-700' : ''}`}
                      onClick={() => {
                        setActiveItem(item.to);
                        if (isMobile) setMobileOpen(false);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{item.icon}</span>
                        {!collapsed && <span>{item.name}</span>}
                      </div>
                    </Link>
                  )}

                  {/* Submenu */}
                  {!collapsed && item.subItems && openDropdowns[item.name] && (
                    <ul className="ml-8 mt-1 space-y-1">
                      {item.subItems.map(sub => (
                        <li key={sub.name}>
                          <Link
                            to={sub.to}
                            className={`block px-3 py-2 rounded-md text-sm hover:bg-gray-700 transition ${
                              activeItem === sub.to ? 'bg-gray-700' : ''
                            }`}
                            onClick={() => {
                              setActiveItem(sub.to);
                              if (isMobile) setMobileOpen(false);
                            }}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <FiUser />
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold">Admin</p>
                {/* <p className="text-xs text-gray-400">Student</p> */}
              </div>
            )}
          </div>
          {!collapsed && (
            <div className="flex justify-between mt-4">
              <button className="p-2 rounded-lg hover:bg-gray-700">
                <FiSettings />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-700">
                <FiLogOut />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;