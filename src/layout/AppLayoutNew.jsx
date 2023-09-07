import React, { useContext, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { FiHome, FiUsers } from 'react-icons/fi';
import { BsCameraFill, BsCart3, BsCreditCard } from 'react-icons/bs';
import { RiDashboardLine } from 'react-icons/ri';
import { TbTruckDelivery } from 'react-icons/tb';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { BiCaretUp, BiMenu } from 'react-icons/bi';
import CustomDropdown from '../components/Dropdown';
import { GrClose } from 'react-icons/gr';
import logo from '../assets/images/logo.png';
import { ToggleSidebarContext } from '../App';
import { GET_STORAGE_ITEM, REMOVE_STORAGE_ITEM } from '../config/storage';
import { MdOutlineWallet } from 'react-icons/md';

export const handleLogout = () => {
  REMOVE_STORAGE_ITEM('token');
  REMOVE_STORAGE_ITEM('refresh_token');
  REMOVE_STORAGE_ITEM('user');
  REMOVE_STORAGE_ITEM('phone');
  REMOVE_STORAGE_ITEM('account');

  window.location.replace('/login');
};

const AppLayoutNew = ({ children, noHeader }) => {
  const navigate = useNavigate();
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const { sidebarOpen, setSidebarOpen } = useContext(ToggleSidebarContext);
  const img_url = GET_STORAGE_ITEM('user')?.photo;
  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const sidebarElements = [
    {
      name: 'Dashboard',
      path: '/home',
      icon: <FiHome />,
    },
    {
      name: 'Book-keeping Mngmt.',
      path: null,
      icon: <BsCreditCard />,
      hasSubMenu: true,
      subMenu: [
        {
          name: 'All Expenses',
          path: '/all-expenses',
          icon: <BsCart3 />,
        },
        {
          name: 'All Sales',
          path: '/all-sales',
          icon: <MdOutlineWallet size={17} />,
        },
        {
          name: 'All Debts',
          path: null,
          icon: <BsCameraFill size={15} />,
        },
      ],
    },
    {
      name: 'Customers / Suppliers',
      path: '/customers',
      icon: <FiUsers />,
    },
    {
      name: 'Inventory Management',
      path: '/inventory',
      icon: <RiDashboardLine />,
    },
    {
      name: 'Delivery Management',
      path: '/delivery-management',
      icon: <TbTruckDelivery />,
    },
    {
      name: 'Reports',
      path: null,
      icon: <BsCreditCard />,
    },
  ];

  const secondarySideBarItems = [
    {
      title: 'Sub accounts',
      path: '/sub-accounts',
    },
    {
      title: 'Glowbiz Premium',
      path: null,
    },
    {
      title: 'Settings',
      path: '/profile',
    },
  ];

  if (!GET_STORAGE_ITEM('token')) {
    return <Navigate to={'/login'} />;
  }

  if (!GET_STORAGE_ITEM('user').isPhoneConfirmed) {
    return <Navigate to={'/verify-account'} />;
  }

  if (!GET_STORAGE_ITEM('account').id) {
    return <Navigate to={'/create-business'} />;
  }

  return (
    <div className="flex h-screen">
      <aside
        className={`flex flex-col h-full overflow-y-auto bg-white/90 py-5 overflow-hidden transition-all ease-in-out duration-300 ${
          !sidebarOpen ? 'w-0 xl:w-[300px]' : 'w-[300px]'
        }`}
      >
        <div className="flex items-center gap-2 px-10">
          <img src={logo} alt="logo" className="w-44" />
        </div>
        <div className="mt-10 px-5 mb-5">
          <ul>
            {sidebarElements.map((item, idx) => (
              <li
                key={idx}
                className={`items-center text-sm font-medium opacity-70 pl-6 pr-5 py-3.5 hover:opacity-100 hover:text-primary cursor-pointer transition-all duration-300 ease-in-out
                ${item.hasSubMenu ? 'grid' : 'flex'}
                ${item.hasSubMenu && openSubMenu === idx ? 'active-link' : ''}`}
                onClick={() => {
                  if (!item.hasSubMenu) {
                    setSidebarOpen(false);
                  }
                  setTimeout(() => {
                    item.hasSubMenu ? toggleSubMenu(idx) : item.path ? navigate(item.path) : null;
                  }, 10);
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center font-medium">
                    <span>{item.icon}</span>
                    <span className="whitespace-nowrap">{item.name}</span>
                  </div>
                  {item.hasSubMenu ? (
                    <BiCaretUp
                      size={12}
                      className={` ml-auto block transform ${
                        openSubMenu === idx ? 'rotate-0' : 'rotate-180'
                      } transition-transform duration-300 origin-center`}
                    />
                  ) : null}
                </div>
                {item.hasSubMenu && openSubMenu === idx ? (
                  <ul className="pl-6 mt-2">
                    {item.subMenu.map((subItem, subIdx) => (
                      <li
                        key={subIdx}
                        onClick={() => {
                          setSidebarOpen(false);
                          setTimeout(() => {
                            subItem.path ? navigate(subItem.path) : null;
                          }, 10);
                        }}
                        className="text-sm py-2 hover:opacity-100 !text-black opacity-80 hover:text-primary cursor-pointer transition-all duration-300 ease-in-out"
                      >
                        <div className="flex gap-3 items-center font-medium">
                          <span>{subItem.icon}</span>
                          <span>{subItem.name}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto">
          <ul className="px-5">
            {secondarySideBarItems.map((item, idx) => (
              <li
                onClick={() => {
                  setSidebarOpen(false);
                  setTimeout(() => {
                    item.path ? navigate(item.path) : null;
                  }, 10);
                }}
                to={item.path ?? '#'}
                key={idx}
                className={`text-black/80 text-sm mb-1 px-6 py-2 flex gap-2.5 items-center hover:font-semibold hover:bg-slate-200 ${'hover:text-primary'} cursor-pointer`}
              >
                {item.title}
              </li>
            ))}
            <button onClick={handleLogout} className="w-full" to={'/login'}>
              <span
                className={`text-black/80 text-sm mb-1 px-7 py-1.5 flex gap-2.5 items-center hover:font-semibold hover:bg-slate-200 ${'hover:text-primary'}`}
              >
                Logout
              </span>
            </button>
          </ul>
        </div>
      </aside>
      <main className="flex-1 h-screen overflow-auto overflow-x-hidden bg-bg">
        {noHeader ? null : (
          <header className="w-full min-w-[300px] h-[60px] lg:h-[120px] flex items-center justify-between px-5 sm:px-7 ">
            <div>
              <div className="hidden lg:block">
                <CustomDropdown />
              </div>
              <span className="block lg:hidden">
                {!sidebarOpen ? (
                  <BiMenu onClick={() => setSidebarOpen(true)} size={40} />
                ) : (
                  <GrClose onClick={() => setSidebarOpen(false)} size={30} />
                )}
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <button className="relative p-1.5 rounded bg-primary/30">
                <FaBell size={14} className="text-primary" />
              </button>
              <div className="flex items-center gap-2">
                <img className="w-11 rounded-full" src={img_url} alt="auth-user" />
              </div>
            </div>
          </header>
        )}
        <section className="min-w-[300px]">{children}</section>
      </main>
    </div>
  );
};

export default AppLayoutNew;
