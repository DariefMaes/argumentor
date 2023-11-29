"use client";

import { useState } from "react";

export default function Pricing() {
  const [annual, setAnnual] = useState<boolean>(true);

  return (
    <section className="relative">
      {/* Radial gradient */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
          <div className="absolute inset-0 translate-z-0 bg-green rounded-full blur-[120px] opacity-50" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Content */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <div>
              <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-800 pb-3">
                Pricing plans
              </div>
            </div>
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
              Flexible plans and features
            </h2>
            <p className="text-lg text-slate-400">
              Choose a plan that fits your academic intensity. With ArguMentor,
              gain access to powerful arguments and credible sources at a value
              that makes sense for your study habits and budget.
            </p>
          </div>
          {/* Pricing tabs */}
          <div className="relative">
            {/* Blurred shape */}
            {/* <div
              className="max-md:hidden absolute bottom-0 -mb-20 left-2/3 -translate-x-1/2 blur-2xl opacity-70 pointer-events-none"
              aria-hidden="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
                <defs>
                  <linearGradient
                    id="bs5-a"
                    x1="19.609%"
                    x2="50%"
                    y1="14.544%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#bs5-a)"
                  fillRule="evenodd"
                  d="m661 736 461 369-284 58z"
                  transform="matrix(1 0 0 -1 -661 1163)"
                />
              </svg>
            </div> */}
            {/* Content */}
            <div className="grid md:grid-cols-4 xl:-mx-6 text-sm [&>div:nth-of-type(-n+4)]:py-6 [&>div:nth-last-of-type(-n+4)]:pb-6 max-md:[&>div:nth-last-of-type(-n+4)]:mb-8 max-md:[&>div:nth-of-type(-n+4):nth-of-type(n+1)]:rounded-t-3xl max-md:[&>div:nth-last-of-type(-n+4)]:rounded-b-3xl md:[&>div:nth-of-type(2)]:rounded-tl-3xl md:[&>div:nth-of-type(4)]:rounded-tr-3xl md:[&>div:nth-last-of-type(3)]:rounded-bl-3xl md:[&>div:nth-last-of-type(1)]:rounded-br-3xl [&>div]:bg-slate-700/20 [&>div:nth-of-type(4n+1)]:bg-transparent max-md:[&>div:nth-of-type(4n+5)]:hidden max-md:[&>div:nth-of-type(4n+2)]:order-1 max-md:[&>div:nth-of-type(4n+3)]:order-2 max-md:[&>div:nth-of-type(4n+4)]:order-3 max-md:md:[&>div:nth-of-type(n)]:mb-0 [&>div:nth-of-type(4n+3)]:relative before:[&>div:nth-of-type(4n+3)]:absolute before:[&>div:nth-of-type(4n+3)]:-inset-px before:[&>div:nth-of-type(4n+3)]:rounded-[inherit] before:[&>div:nth-of-type(4n+3)]:border-x-2 before:[&>div:nth-of-type(3)]:border-t-2 before:[&>div:nth-last-of-type(2)]:border-b-2 before:[&>div:nth-of-type(4n+3)]:border-green before:[&>div:nth-of-type(4n+3)]:-z-10 before:[&>div:nth-of-type(4n+3)]:pointer-events-none">
              {/* Pricing toggle */}
              <div className="px-6 flex flex-col justify-end">
                <div className="pb-5 md:border-b border-slate-800">
                  {/* Toggle switch */}
                  <div className="max-md:text-center">
                    {/* <div className="inline-flex items-center whitespace-nowrap">
                      <div className="text-sm text-slate-500 font-medium mr-2 md:max-lg:hidden">
                        Monthly
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="toggle"
                          className="peer sr-only"
                          checked={annual}
                          onChange={() => setAnnual(!annual)}
                        />
                        <label
                          htmlFor="toggle"
                          className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-slate-400 px-0.5 outline-slate-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow-sm before:transition-transform before:duration-150 peer-checked:bg-green peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green"
                        >
                          <span className="sr-only">Pay Yearly</span>
                        </label>
                      </div>
                      <div className="text-sm text-slate-500 font-medium ml-2">
                        Yearly <span className="text-teal-500">(-20%)</span>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* Pro price */}
              <div className="px-6 flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-green to-green/20 pb-0.5">
                    Teacher's Pet
                  </div>
                  <div className="mb-1">
                    <span className="text-lg font-medium text-slate-500">
                      $
                    </span>
                    <span className="text-3xl font-bold text-slate-50">
                      {annual ? "0" : "0"}
                    </span>
                    <span className="text-sm text-slate-600 font-medium">
                      /mo
                    </span>
                  </div>
                  <div className="text-slate-500">
                    Perfect for the casual learner.
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <a
                    className="btn-sm text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group"
                    href="#0"
                  >
                    Get Started{" "}
                    <span className="tracking-normal text-green group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                      -&gt;
                    </span>
                  </a>
                </div>
              </div>
              {/* Team price */}
              <div className="px-6 flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-green to-green/20 pb-0.5">
                    Procrastinator
                  </div>
                  <div className="mb-1">
                    <span className="text-lg font-medium text-slate-500">
                      $
                    </span>
                    <span className="text-3xl font-bold text-slate-50">
                      {annual ? "4.99" : "4.99"}
                    </span>
                    <span className="text-sm text-slate-600 font-medium">
                      /mo
                    </span>
                  </div>
                  <div className="text-slate-500">
                    Ideal for last-minute essay support.
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <a
                    className="btn-sm text-white bg-green hover:bg-green-600 w-full transition duration-150 ease-in-out group"
                    href="#0"
                  >
                    Get Started{" "}
                    <span className="tracking-normal text-green-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                      -&gt;
                    </span>
                  </a>
                </div>
              </div>
              {/* Enterprise price */}
              <div className="px-6 flex flex-col justify-end">
                <div className="grow pb-4 mb-4 border-b border-slate-800">
                  <div className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-green to-green/60 pb-0.5">
                    Academic Weapon
                  </div>
                  <div className="mb-1">
                    <span className="text-lg font-medium text-slate-500">
                      $
                    </span>
                    <span className="text-3xl font-bold text-slate-50">
                      {annual ? "9.99" : "9.99"}
                    </span>
                    <span className="text-sm text-slate-600 font-medium">
                      /mo
                    </span>
                  </div>
                  <div className="text-slate-500">
                    The ultimate tool for serious scholars.
                  </div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <a
                    className="btn-sm text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group"
                    href="#0"
                  >
                    Get Started{" "}
                    <span className="tracking-normal text-green group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                      -&gt;
                    </span>
                  </a>
                </div>
              </div>
              {/* # Usage */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4">Usage</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">
                  Usage
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">
                  Usage
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">
                  Usage
                </div>
              </div>
              {/* Social Connections */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">
                  Searches
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    10 <span className="md:hidden">Searches</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    200 <span className="md:hidden">Searches</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    500 <span className="md:hidden">Searches</span>
                  </span>
                </div>
              </div>
              {/* Custom Domains */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">
                  Chat with sources
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    id="fi_2976286"
                    className="shrink-0 fill-red-500 mr-3 w-3 h-3"
                    enableBackground="new 0 0 320.591 320.591"
                    height="512"
                    viewBox="0 0 320.591 320.591"
                    width="512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <g id="close_1_">
                        <path d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z"></path>
                        <path d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z"></path>
                      </g>
                    </g>
                  </svg>

                  <span>
                    0 <span className="md:hidden">Chat with sources</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    Unlimited{" "}
                    <span className="md:hidden">Chat with sources</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    Unlimited{" "}
                    <span className="md:hidden">Chat with sources</span>
                  </span>
                </div>
              </div>
              {/* User Role Management */}
              {/* <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">
                  User Role Management
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    Unlimited{" "}
                    <span className="md:hidden">User Role Management</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    Unlimited{" "}
                    <span className="md:hidden">User Role Management</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    Unlimited{" "}
                    <span className="md:hidden">User Role Management</span>
                  </span>
                </div>
              </div> */}
              {/* External Databases */}
              {/* <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">
                  External Databases
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    1 <span className="md:hidden">External Databases</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    5 <span className="md:hidden">External Databases</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    Unlimited{" "}
                    <span className="md:hidden">External Databases</span>
                  </span>
                </div>
              </div> */}
              {/* # Features */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4">
                  Features
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">
                  Features
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">
                  Features
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">
                  Features
                </div>
              </div>
              {/* Custom Connection */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">
                  Topic Research
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    <span className="md:hidden">Topic Research</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    <span className="md:hidden">Topic Research</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    <span className="md:hidden">Topic Research</span>
                  </span>
                </div>
              </div>
              {/* Advanced Deployment Options */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">
                  Chat with sources
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
                  <span>
                    <span className="md:hidden">Chat with sources</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    <span className="md:hidden">Chat with sources</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    <span className="md:hidden">Chat with sources</span>
                  </span>
                </div>
              </div>
              {/* Extra Add-ons */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">
                  Generate Essays
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
                  <span>
                    <span className="md:hidden"> Generate Thesis</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
                  <span>
                    <span className="md:hidden"> Generate Essays</span>
                  </span>
                </div>
              </div>

              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    <span className="md:hidden"> Generate Essays</span>
                  </span>
                </div>
              </div>
              {/*   Generate Thesis */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">
                  Generate Thesis
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
                  <span>
                    <span className="md:hidden"> Generate Thesis</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
                  <span>
                    <span className="md:hidden"> Generate Thesis</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    <span className="md:hidden"> Generate Thesis</span>
                  </span>
                </div>
              </div>
              {/* MLA + APA Citations */}
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">
                  MLA + APA Citations
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
                  <span>
                    <span className="md:hidden">MLA + APA Citations</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
                  <span>
                    <span className="md:hidden">MLA + APA Citations</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    <span className="md:hidden">MLA + APA Citations</span>
                  </span>
                </div>
              </div>
              {/* Enterprise Add-ons */}
              {/* <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">
                  Enterprise Add-ons
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
                  <span>
                    <span className="md:hidden">Enterprise Add-ons</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
                  <span>
                    <span className="md:hidden">Enterprise Add-ons</span>
                  </span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg
                    className="shrink-0 fill-green mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="9"
                  >
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>
                    <span className="md:hidden">Enterprise Add-ons</span>
                  </span>
                </div>
              </div> */}
              {/* # Support */}
              {/* <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4">
                  Support
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 hidden">
                  Support
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">
                  Support
                </div>
              </div> */}
              {/* <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-50 font-medium mt-4 md:hidden">
                  Support
                </div>
              </div> */}
              {/* Premium Support */}
              {/* <div className="px-6 flex flex-col justify-end">
                <div className="py-2 text-slate-400 border-b border-slate-800">Premium Support</div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
                  <span><span className="md:hidden">Premium Support</span></span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg className="shrink-0 fill-green mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span><span className="md:hidden">Premium Support</span></span>
                </div>
              </div>
              <div className="px-6 flex flex-col justify-end">
                <div className="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
                  <svg className="shrink-0 fill-green mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span><span className="md:hidden">Premium Support</span></span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
