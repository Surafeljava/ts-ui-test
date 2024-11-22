'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
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
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline'

import { useAuth } from '../context/AuthContext'

const authenticatedRoutes = [
  { name: 'Home', href: '/', icon: HomeIcon, current: true },
  { name: 'Dashboard', href: '#', icon: ChartPieIcon, current: false },
  { name: 'Projects', href: '/projects', icon: FolderIcon, current: false },
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


export default function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col border-r border-gray-600">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 ">
              <div className="flex h-20 shrink-0 items-center border-b border-gray-600 px-4">
                <img
                  alt="Testsavant.ai"
                  src="/ts_logo.webp"
                  className="h-10 w-auto"
                />
              </div>
              <nav className="flex flex-1 flex-col mt-4">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="space-y-1 pr-6">
                      {(isAuthenticated ? authenticatedRoutes : nonAuthenticatedRoutes).map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                              'group flex gap-x-3 rounded-r-lg py-2.5 text-base items-center px-4',
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
                      <div className="text-sm font-normal text-gray-400 px-4">Registration & Login</div>
                      <ul role="list" className="space-y-1 pr-6 mt-2">
                      {authenticationRoutes.map((item) => (
                          <li key={item.id}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                'group flex gap-x-3 rounded-r-lg py-2.5 text-base items-center px-4',
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
                  {isAuthenticated && userData && (
                    <li className="mt-auto">
                      <button
                        onClick={() => setShowUserProfileModal(!showUserProfileModal)}
                        className="flex items-center gap-x-4 px-4 py-3 text-sm/6 text-white hover:bg-gray-800 border-t border-gray-600"
                      >
                        <div className='size-9 rounded-full bg-white flex items-center justify-center'>
                          <p className='text-gray-700 text-base font-normal'>SK</p>
                        </div>
                        <span className="sr-only">Your profile</span>
                        <div className="flex flex-col flex-grow">
                          <p aria-hidden="true" className='font-semibold'>{userData.username}</p>
                          <p aria-hidden="true" className='font-normal text-sm text-gray-400'>{userData.email}</p>
                        </div>
                        <div>
                          <EllipsisVerticalIcon className='size-6'/>
                        </div>
                      </button>
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
        </div>
    );
}