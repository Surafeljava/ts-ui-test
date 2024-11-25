'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import {
  Bars3Icon,
  KeyIcon,
  ChartPieIcon,
  ShieldExclamationIcon,
  FolderIcon,
  HomeIcon,
  BuildingOffice2Icon,
  XMarkIcon,
  CircleStackIcon,
  UserPlusIcon,
  ArrowLeftEndOnRectangleIcon,
  EllipsisVerticalIcon,
  QueueListIcon,
  PlusIcon,
  CodeBracketSquareIcon,
  ChevronUpIcon,
  ViewColumnsIcon,
  ChevronDoubleLeftIcon
} from '@heroicons/react/24/outline'

import { useAuth } from '../context/AuthContext'


const authenticatedRoutes = [
  { name: 'Home', href: '/', icon: HomeIcon, current: true },
  { name: 'Dashboard', href: '/dashboard', icon: ChartPieIcon, current: false },
  { name: 'Projects', href: '/projects', icon: FolderIcon, current: false, children: [
    { name: 'List Projects', href: '/projects', icon: QueueListIcon, current: false },
    { name: 'Create Project', href: '/projects/#', icon: PlusIcon, current: false },
    { name: 'Traces', href: '/projects/traces', icon: CodeBracketSquareIcon, current: false },
  ] },
  { name: 'Datasets', href: '#', icon: CircleStackIcon, current: false },
  { name: 'Organization', href: '#', icon: BuildingOffice2Icon, current: false },
  { name: 'Api Keys', href: '#', icon: KeyIcon, current: false },
  { name: 'Scanners', href: '#', icon: ShieldExclamationIcon, current: false },
]

const nonAuthenticatedRoutes = [
  { name: 'Home', href: '/', icon: HomeIcon, current: true }
]
const authenticationRoutes = [
  { id: 1, name: 'Login', href: '/auth/login', icon: ArrowLeftEndOnRectangleIcon, current: false },
  { id: 2, name: 'Register', href: '/auth/register', icon: UserPlusIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Navbar({children}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [selectedParentNav, setSelectedParentNav] = useState();
    const [selectedChildNav, setSelectedChildNav] = useState();

    const [showOnlyIcons, setShowOnlyIcons] = useState(true);

    const {isAuthenticated, logout, userData} = useAuth();

    const [showUserProfileModal, setShowUserProfileModal] = useState(false);

    return (
        <div>
          <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 flex">
              <DialogPanel
                transition
                className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
              >
                <TransitionChild>
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                    </button>
                  </div>
                </TransitionChild>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      alt="Testsavant.ai"
                      src="/ts_logo.webp"
                      className="h-10 w-auto"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {(isAuthenticated ? authenticatedRoutes : nonAuthenticatedRoutes).map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                  'group flex items-center gap-x-3 rounded-lg p-2 text-base',
                                )}
                              >
                                <item.icon aria-hidden="true" className="size-5 shrink-0" />
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                      {!isAuthenticated && (
                        <li>
                          <div className="text-sm font-normal text-gray-400">Registration & Login</div>
                          <ul role="list" className="space-y-1 pr-6 mt-2">
                          {authenticationRoutes.map((item) => (
                              <li key={item.id}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                    'group flex gap-x-3 rounded-lg p-2 text-base items-center',
                                  )}
                                >
                                  <item.icon aria-hidden="true" className="size-5 shrink-0" />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </DialogPanel>
            </div>
          </Dialog>

          {/* Static sidebar for desktop */}
          <div className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col border-r border-gray-600 ${!showOnlyIcons ? 'lg:w-72' : 'lg:w-20'}`}>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 ">
              <div className={`relative flex flex-row h-20 shrink-0 items-center border-b border-gray-600 px-4 ${!showOnlyIcons ? 'justify-between' : 'justify-center'}`}>
                {!showOnlyIcons && (
                  <img
                    alt="Testsavant.ai"
                    src="/ts_logo.webp"
                    className="h-10 w-auto"
                  />
                )}
                <button onClick={() => setShowOnlyIcons(!showOnlyIcons)} className={`p-2 bg-gray-800 rounded-full`}>
                  {showOnlyIcons ? <ViewColumnsIcon className='size-5'/> : <ChevronDoubleLeftIcon className='size-5'/>}
                </button>
              </div>
              <nav className="flex flex-1 flex-col mt-4">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className={`space-y-1 ${!showOnlyIcons && 'pr-6'}`}>
                      {(isAuthenticated ? authenticatedRoutes : nonAuthenticatedRoutes).map((item) => (
                        <li key={item.name}>
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              if(selectedParentNav===item.name){
                                setSelectedParentNav()
                              }else{
                                setSelectedParentNav(item.name)
                              }

                              if(item.children){
                                setShowOnlyIcons(false);
                              }
                              
                            }}
                            className={classNames(
                              selectedParentNav===item.name
                                ? `bg-tsPrimaryBlue text-white`
                                : `text-gray-400 hover:bg-gray-800 hover:text-white`,
                              `group flex gap-x-3 rounded-r-lg py-2.5 text-base items-center px-4 ${showOnlyIcons && 'justify-center'}`,
                            )}
                          >
                            <item.icon aria-hidden="true" className="size-6 shrink-0" />
                            {!showOnlyIcons && (
                              <div className="flex flex-row flex-grow">
                                {item.name}
                              </div>
                            )}
                            {selectedParentNav===item.name && !showOnlyIcons && <ChevronUpIcon className='size-4'/>}
                          </Link>
                          {selectedParentNav===item.name && (
                            <div className='flex flex-col pl-4 gap-1 py-2'>
                              {item.children && item.children.map((child) => {
                                return (
                                  <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setSelectedChildNav(child.name)}
                                  className={classNames(
                                    selectedChildNav===child.name
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                    `group flex gap-x-3 rounded-lg py-2.5 text-sm items-center px-4 ${showOnlyIcons && 'justify-center'}`,
                                  )}
                                  >
                                    <child.icon aria-hidden="true" className="size-5 shrink-0" />
                                    {!showOnlyIcons && child.name}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                  {!isAuthenticated && (
                    <li>
                      {!showOnlyIcons ? (
                        <div className="text-sm font-normal text-gray-400 px-4">Registration & Login</div>
                      ) : (
                        <div className="w-full h-[1px] bg-gray-600"></div>
                      )}
                      <ul role="list" className={`space-y-1 mt-2 ${!showOnlyIcons && 'pr-6'}`}>
                      {authenticationRoutes.map((item) => (
                          <li key={item.id}>
                            <a
                              key={item.href}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                `group flex gap-x-3 rounded-r-lg py-2.5 text-base items-center px-4 ${showOnlyIcons && 'justify-center'}`,
                              )}
                            >
                              <item.icon aria-hidden="true" className="size-6 shrink-0" />
                              {!showOnlyIcons && item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}
                  {isAuthenticated && userData && (
                    <li className="mt-auto flex">
                      {!showOnlyIcons ? (
                        <button
                          onClick={() => setShowUserProfileModal(!showUserProfileModal)}
                          className="flex flex-grow items-center gap-x-4 px-4 py-3 text-sm/6 text-white hover:bg-gray-800 border-t border-gray-600"
                        >
                          <div className='size-9 rounded-full bg-white flex items-center justify-center'>
                            <p className='text-gray-700 text-base font-normal'>SK</p>
                          </div>
                          <span className="sr-only">Your profile</span>
                          <div className="flex flex-col flex-grow items-start">
                            <p aria-hidden="true" className='font-semibold'>{userData.username}</p>
                            <p aria-hidden="true" className='font-normal text-sm text-gray-400'>{userData.email}</p>
                          </div>
                          <div>
                            <EllipsisVerticalIcon className='size-6'/>
                          </div>
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowUserProfileModal(!showUserProfileModal)}
                          className="flex flex-grow items-center gap-x-4 px-4 py-3 text-sm/6 text-white hover:bg-gray-800 border-t border-gray-600"
                        >
                          <div className='size-9 rounded-full bg-white flex items-center justify-center'>
                            <p className='text-gray-700 text-base font-normal'>SK</p>
                          </div>
                        </button>
                      )}
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>



          <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-400 lg:hidden">
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
            <div className="flex-1 text-sm/6 font-semibold text-white">Dashboard</div>
            {isAuthenticated && userData && (
              <a href="#">
                <span className="sr-only">Your profile</span>
                <div className='size-8 rounded-full bg-white flex items-center justify-center'>
                  <p className='text-gray-700 text-base font-normal'>SK</p>
                </div>
              </a>
            )}
          </div>

          {/* Add the user profile modal here */}


          <div className={`w-full min-h-screen bg-gray-900 ${!showOnlyIcons ? 'lg:pl-72' : 'lg:pl-20'}`}>
            {children}
          </div>
        </div>
    );
}