// import {useEffect} from 'react';
// import {useNavigate} from 'react-router-dom';
import './UserHomePage.css'
import {motion} from "framer-motion"
import Variants from "../../Components/Variants";
import {Link} from "react-router-dom";
import logo from "../../images/hi-removebg-preview.png"


const UserHomePage = () => {

    return (
        <motion.div id="__docusaurus"
                    initial="exit"
                    animate="enter"
                    exit="exit"
                    variants={Variants.variant1}
        >
            <div id="docusaurus-base-url-issue-banner-"/>
            <header
                className=" top-0 inset-x-0 z-50 h-20 bg-transparent border-none header_GVHt headerHidden_kyDz">
                <div className="absolute top-0 left-0 z-40 w-full bg-monochrome-white">
                    <nav className="flex items-center justify-between h-20 mx-[200px]">
                        <a className={"flex"} href={"/transactions"}><img className="w-16" src={logo}
                                                                          alt="Money Lover"/><span
                            className={"mt-3 text-[40px] text-[#2db84c]"}>Aloha</span></a>
                        <div className="md:flex items-center">
                            <ul className="invisible md:visible fixed md:static flex flex-row gap-6 lg:gap-x-8 items-center mt-1">
                                <li><a href="https://finsify.com/" target="_blank" rel="noopener noreferrer"
                                       style={{textDecoration: 'none'}}
                                       className="flex items-center font-medium text-16 text-dark-brown">About us</a>
                                </li>
                                <li><a style={{textDecoration: 'none'}}
                                       className="flex items-center font-medium text-16 text-dark-brown"
                                       href={"/career"}>Career</a></li>
                                <li className="border-t border-monochrome-medium-tint md:border-none"><a
                                    style={{textDecoration: 'none'}}
                                    className="inline-flex text-16 font-medium text-dark-brown leading-24 py-4 w-full h-full gap-x-2"
                                    href=""><img className="w-6 inline-block" src="https://moneylover.me/img/vi.svg"
                                                 alt="Vietnam"/>Vietnamese</a>
                                </li>
                            </ul>
                            <button aria-label="menu button" style={{backgroundPosition: 'center'}}
                                    className="flex items-center justify-center w-9 h-9 md:hidden text-green-ml fill-current bg-menu bg-no-repeat"
                                    type="button"/>
                        </div>
                    </nav>
                </div>
            </header>
            <div className="">
                <main className="">
                    <div className="md:pt-20 pb:12 lg:mb-24 md:h-full">
                        <div className="md:px-14 lg:px-44">
                            <div className="text-center mx-4 space-y-2">
                                <h1 className="text-[#2db84c] text-[64px] font-bold">
                                    Simple way
                                </h1>
                                <div className={"text-[64px]"}>
                                    <span className={"text-[#555555]"}>to manager</span>
                                    <span className={"text-[#2db84c]"}> personal finances</span>
                                </div>
                            </div>
                            <div
                                className=" grid grid-cols-2 gap-x-2 lg:gap-x-4 md:flex md:justify-center mt-9 lg:mt-12">
                                <Link to={"/login"}
                                      className=" button-ml  font-bold text-[#2db84c] px-[40px] border-[1px] border-[#2db84c] hover:bg-[#2db84c] hover:text-white rounded-[8px] py-[14px]">
                                    Try on browser
                                </Link>
                                <Link to="/login"
                                      className="button-ml  font-bold  px-[40px] border-[1px] border-[#2db84c] bg-[#2db84c] text-white hover:bg-[#0d8e22]  rounded-[8px] py-[14px]"
                                >Download for free</Link>
                            </div>
                        </div>
                    </div>
                    <section className=" bg-monochrome-white  mt-0 w-[1168px] h-[148px]  px-[16px] mx-auto">
                        <figure className="grid grid-cols-4 gap-x-6 gap-y-4">
                            <div
                                className="flex p-4 px-2 py-6  rounded-lg bg-[#EFFDF7]  flex-col items-center">
                                <img src="http://moneylover.me/img/introfeature/1.svg" alt=""/><p
                                className="font-bold text-dark-tiny leading-24 text-center lg:text-20 lg:leading-28">100%
                                Secured data</p></div>
                            <div
                                className="flex p-4 lg:px-2 lg:py-6 gap-y-2 lg:gap-y-4 rounded-lg bg-[#EFFDF7] flex-col items-center">
                                <img src="http://moneylover.me/img/introfeature/2.svg" alt=""/><p
                                className="font-bold text-dark-tiny leading-24 text-center lg:text-20 lg:leading-28">1
                                Million+ users</p></div>
                            <div
                                className="flex p-4 lg:px-2 lg:py-6 gap-y-2 lg:gap-y-4 rounded-lg bg-[#EFFDF7] flex-col items-center">
                                <img src="http://moneylover.me/img/introfeature/3.svg" alt=""/><p
                                className="font-bold text-dark-tiny leading-24 text-center lg:text-20 lg:leading-28">100K+
                                5-star Reviews</p></div>
                            <div
                                className="flex p-4 lg:px-2 lg:py-6 gap-y-2 lg:gap-y-4 rounded-lg bg-[#EFFDF7] flex-col items-center">
                                <img src="http://moneylover.me/img/introfeature/4.svg" alt=""/><p
                                className="font-bold text-dark-tiny leading-24 text-center lg:text-20 lg:leading-28">App
                                of the day</p></div>
                        </figure>
                    </section>
                    <section className=" mt-44 bg-monochrome-white m-auto w-[1168px] ">
                        <figure
                            className="figure_vZXh grid grid-cols-8 md:grid-cols-12 items-center justify-items-start gap-y-4 md:gap-x-12 md:gap-y-0 pb-14 md:py-0">
                            <figcaption
                                className="col-span-full md:col-span-5 md:col-start-7 md:place-self-center md:self-center md:order-2">
                                <h3 className="text-26 tracking-tight font-medium md:text-26 lg:text-40 md:leading-52 leading-32 text-dark-tiny">Simple
                                    money tracker</h3><p className="mt-2 text-monochrome-shade">It takes seconds to
                                record daily transactions. Put them into clear and visualized categories such as
                                Expense: Food, Shopping or Income: Salary, Gift.</p></figcaption>
                            <div
                                className="md:order-1 col-span-full md:col-span-5 md:col-start-2 md:place-self-center md:self-center">
                                <div className="imgWrapper_H04T md:w-11/12 mx-auto"><img
                                    src="http://moneylover.me/img/details/Transaction@4x.png" alt="coverage"/></div>
                            </div>
                        </figure>
                        <figure
                            className="figure_vZXh grid grid-cols-8 md:grid-cols-12 items-center justify-items-start gap-y-4 md:gap-x-12 md:gap-y-0 pb-14 md:py-0">
                            <figcaption
                                className="col-span-full md:col-span-5 md:col-start-2 md:place-self-center md:self-center">
                                <h3 className="text-26 tracking-tight font-medium md:text-26 lg:text-40 md:leading-52 leading-32 text-dark-tiny">Painless
                                    budgeting</h3><p className="mt-2 text-monochrome-shade">It takes seconds to record
                                daily transactions. Put them into clear and visualized categories such as Expense: Food,
                                Shopping or Income: Salary, Gift.</p></figcaption>
                            <div
                                className="col-span-full md:col-span-5 md:col-start-7 md:place-self-center md:self-center">
                                <div className="imgWrapper_H04T md:w-11/12 mx-auto"><img
                                    src="http://moneylover.me/img/details/budget@4x.png" alt="risks and tests to run"/>
                                </div>
                            </div>
                        </figure>
                        <figure
                            className="figure_vZXh grid grid-cols-8 md:grid-cols-12 items-center justify-items-start gap-y-4 md:gap-x-12 md:gap-y-0 pb-14 md:py-0">
                            <figcaption
                                className="col-span-full md:col-span-5 md:col-start-7 md:place-self-center md:self-center md:order-2">
                                <h3 className="text-26 tracking-tighter font-medium md:text-26 lg:text-40 md:leading-52 leading-32 text-dark-tiny">The
                                    whole picture in one place</h3><p className="mt-2 text-monochrome-shade">One report
                                to give a clear view on your spending patterns. Understand where your money comes and
                                goes with easy-to-read graphs.</p></figcaption>
                            <div
                                className="md:order-1 col-span-full md:col-span-5 md:col-start-2 md:place-self-center md:self-center">
                                <div className="imgWrapper_H04T md:w-11/12 mx-auto"><img
                                    src="http://moneylover.me/img/details/REPORT@4x.png" alt="time savings"/></div>
                            </div>
                        </figure>
                    </section>
                    <section className=" mt-14 lg:mt-44 m-auto w-[1168px]"><h2
                        className="text-26 tracking-tight lg:text-40 lg:leading-52 text-dark-tiny leading-32 font-medium text-center">Features
                        our users love</h2>
                        <div className="grid mt-6 lg:mt-12 gap-y-8 lg:gap-x-10 lg:gap-y-12 grid-cols-1 lg:grid-cols-3">
                            <div className="flex flex-col items-center"><img
                                src="https://moneylover.me/img/features/1.svg"
                                alt="Multiple devices"/><h3
                                className="text-16 lg:text-20 lg:leading-28 font-bold lg:mt-6 leading-24 text-center mt-3 text-dark-tiny">Multiple
                                devices</h3><p
                                className="pt-1 px-4 lg:pt-2 text-16 leading-24 text-dark-brown text-center">Safely
                                synchronize across devices with Bank standard security.</p></div>
                            <div className="flex flex-col items-center"><img
                                src="https://moneylover.me/img/features/2.svg"
                                alt="Recurring transaction"/><h3
                                className="text-16 lg:text-20 lg:leading-28 font-bold lg:mt-6 leading-24 text-center mt-3 text-dark-tiny">Recurring
                                transaction</h3><p
                                className="pt-1 px-4 lg:pt-2 text-16 leading-24 text-dark-brown text-center">Get
                                notified of recurring bills and transactions before due date.</p></div>
                            <div className="flex flex-col items-center"><img
                                src="https://moneylover.me/img/features/3.svg"
                                alt="Travel mode"/><h3
                                className="text-16 lg:text-20 lg:leading-28 font-bold lg:mt-6 leading-24 text-center mt-3 text-dark-tiny">Travel
                                mode</h3><p
                                className="pt-1 px-4 lg:pt-2 text-16 leading-24 text-dark-brown text-center">All
                                currencies supported with up-to-date exchange rate.</p></div>
                            <div className="flex flex-col items-center"><img
                                src="https://moneylover.me/img/features/4.svg"
                                alt="Saving plan"/><h3
                                className="text-16 lg:text-20 lg:leading-28 font-bold lg:mt-6 leading-24 text-center mt-3 text-dark-tiny">Saving
                                plan</h3><p
                                className="pt-1 px-4 lg:pt-2 text-16 leading-24 text-dark-brown text-center">Keep track
                                on savings process to meet your financial goals.</p></div>
                            <div className="flex flex-col items-center"><img
                                src="https://moneylover.me/img/features/5.svg"
                                alt="Debt and loan"/><h3
                                className="text-16 lg:text-20 lg:leading-28 font-bold lg:mt-6 leading-24 text-center mt-3 text-dark-tiny">Debt
                                and loan</h3><p
                                className="pt-1 px-4 lg:pt-2 text-16 leading-24 text-dark-brown text-center">Manage your
                                debts, loans and payment process in one place.</p></div>
                            <div className="flex flex-col items-center"><img
                                src="https://moneylover.me/img/features/6.svg"
                                alt="Scan receipt"/><h3
                                className="text-16 lg:text-20 lg:leading-28 font-bold lg:mt-6 leading-24 text-center mt-3 text-dark-tiny">Scan
                                receipt</h3><p
                                className="pt-1 px-4 lg:pt-2 text-16 leading-24 text-dark-brown text-center">Take
                                pictures of your receipts to auto-process and organize them.</p></div>
                        </div>
                    </section>
                    <section className="mt-12 lg:mt-44 w-[1168px] m-auto">
                        <style
                            dangerouslySetInnerHTML={{__html: " \n  @media screen and (min-width: 1024px) {\n      .slick-slide > div {\n        margin: 0 15px;\n      }\n  }\n  .review-slide p {\n    max-height: 240px;\n  }\n  .review-slide {\n    max-width: 370px;\n    max-height: 324px;\n    margin-top: 24px;\n    border: 1px solid #f0f0f0 !important;\n    border-radius: 8px;\n    box-sizing: border-box;\n  }\n"}}/>
                        <h2 className="text-dark-tiny tracking-tight text-[40px] lg:text-40 lg:leading-52 font-medium leading-32 text-center">See
                            what others have to say</h2>
                        <div className={"flex ml-[430px]"}>
                            <p className="mr-2">
                                <img src="http://moneylover.me/img/Stars.svg" alt=""/>
                            </p>
                            <span className="font-bold pr-1">4.9</span>
                            <span className="text-14"
                                  style={{color: 'rgb(126, 126, 126)'}}> Based on user reviews</span>
                        </div>
                        <div className="slick-slider slick-initialized">
                            <div className="slick-list">
                                <div className="slick-track flex items-center m-auto"
                                     style={{width: '918px', opacity: 1, transform: 'translate3d(0px, 0px, 0px)'}}>
                                    <div data-index={0}
                                         className="slick-slide slick-active slick-center slick-current"
                                         tabIndex={-1} aria-hidden="false"
                                         style={{outline: 'none', width: '306px'}}>
                                        <div>
                                            <div
                                                className="review-slide lg:h-screen grid grid-rows-6 px-4 py-6 lg:p-6 text-center"
                                                tabIndex={-1} style={{width: '100%', display: 'inline-block'}}><p
                                                className="text-dark-brown lg:h-screen">Perfect app. My husband and
                                                I
                                                use it to track all our expenses and income. We generate our
                                                household
                                                accounts and budget using this fab app. Furthermore, the developers
                                                are
                                                hands-on and extremely helpful. Do not look any further. Get this
                                                app
                                                now!.</p><p className="pt-4 font-bold leading-20">Hai Do</p></div>
                                        </div>
                                    </div>
                                    <div data-index={1} className="slick-slide slick-active" tabIndex={-1}
                                         aria-hidden="false" style={{outline: 'none', width: '306px'}}>
                                        <div>
                                            <div
                                                className="review-slide lg:h-screen grid grid-rows-6 px-4 py-6 lg:p-6 text-center"
                                                tabIndex={-1} style={{width: '100%', display: 'inline-block'}}><p
                                                className="text-dark-brown lg:h-screen">This will keep you organized
                                                and
                                                in control, of money you do have and money you will have. This
                                                application is easy to use and will help you keep track of every
                                                dollar.</p><p
                                                className="pt-4 font-bold leading-20">Trung &amp; Thinh</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-index={2} className="slick-slide" tabIndex={-1} aria-hidden="true"
                                         style={{outline: 'none', width: '306px'}}>
                                        <div>
                                            <div
                                                className="review-slide lg:h-screen grid grid-rows-6 px-4 py-6 lg:p-6 text-center"
                                                tabIndex={-1} style={{width: '100%', display: 'inline-block'}}><p
                                                className="text-dark-brown lg:h-screen">A simple, accessible app
                                                that
                                                allows you to budget across weeks, months and years. The neat
                                                financial
                                                calendar lets you set up alerts and keep tabs on all transactions.
                                                Plus,
                                                it works with all currencies.</p><p
                                                className="pt-4 font-bold leading-20">Manh Thang</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="cta" className=" mt-18 lg:mt-44 lg:mb-14 bg-[#2EB74B] rounded-2xl  w-[1168px] m-auto ">
                        <div className="relative grid grid-cols-12  py-12 lg:py-20 ">
                            <div className="col-span-12 col-start-1 lg:col-start-3 lg:col-end-8"><p
                                className="mb-2 text-center tracking-tight lg:text-left text-monochrome-white text-24 leading-32 font-medium lg:font-medium lg:text-40 lg:leading-52">Take
                                your finances to the next levels!</p><p style={{color: '#F3F3F3'}}
                                                                        className="mb-9 tracking-tight text-center lg:text-left leading-32">Don't
                                hesite, money matters.</p>
                                <div className="flex justify-center lg:justify-start w-full"><a
                                    href="https://itunes.apple.com/app/apple-store/id486312413?pt=694013&ct=landing&mt=8"
                                    target="_blank" rel="noopener noreferrer" className="mr-1"><img
                                    src="https://moneylover.me/img/marketplace/appstore.svg" alt=""/></a><a
                                    href="https://play.google.com/store/apps/details?id=com.bookmark.money&referrer=utm_source%3Dlanding"
                                    target="_blank" rel="noopener noreferrer" className="ml-1"><img
                                    src="https://moneylover.me/img/marketplace/google-play.svg" alt=""/></a></div>
                            </div>
                            <img className="invisible w-1/5 lg:visible absolute bottom-0 lg:left-2/3"
                                 src="https://moneylover.me/img/MOCKUP@4x.png" alt=""/></div>
                    </section>
                </main>
            </div>
            <footer className="lg:py-6 lg:m-0 mt-10 border-t border-monochrome-medium-tint">
                <section className=" grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-8 lg:mx-auto"><p
                    className="flex items-center mt-6 pl-3 lg:mt-0 lg:col-span-6 text-16 leading-24 text-dark-brown">©
                    2022
                    Codegym .All rights reserved.</p>
                    <div className="flex flex-col cursor-pointer lg:flex-row justify-center gap-y-4 lg:col-span-5 lg:gap-x-4">
                        <a
                            href="https://finsify.com/" target="_blank" rel="noopener noreferrer"
                            className="flex items-center leading-24 text-16 font-medium text-dark-brown hover:no-underline">About
                            us</a>
                        <a target="_blank"
                           className="flex items-center leading-24 text-16 font-medium text-dark-brown hover:no-underline"
                           href={"/career"}>Career</a>
                        <a href="https://note.moneylover.me/" target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center leading-24 text-16 font-medium text-dark-brown hover:no-underline">Blog</a><a
                        target="_blank"
                        className="flex items-center leading-24 text-16 font-medium text-dark-brown hover:no-underline"
                        href={"/policy"}>Privacy Policy</a>
                    </div>
                    <ul className="lg:col-span-1 lg:place-self-end flex pr-3 items-center justify-start mt-5 mb-8 lg:mt-0 lg:mb-0 gap-x-2">
                        <li><a href="https://www.facebook.com/moneylover.me" target="_blank" rel="noopener noreferrer"
                               className="cursor-pointer hover:no-underline">
                            <svg width={32} height={32} viewBox="0 0 32 32" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.546 12.363v1.455H13.09V16h1.455v6.545h2.909V16h1.935l.247-2.182h-2.182v-1.273c0-.589.058-.902.967-.902h1.215V9.454h-1.95c-2.327 0-3.141 1.091-3.141 2.91z"
                                    fill="#000" fillOpacity="0.54"/>
                                <path
                                    d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 30.545C7.967 30.545 1.455 24.033 1.455 16 1.455 7.967 7.967 1.455 16 1.455c8.033 0 14.545 6.512 14.545 14.545 0 8.033-6.512 14.545-14.545 14.545z"
                                    fill="#000" fillOpacity="0.54"/>
                            </svg>
                        </a></li>
                        <li><a href="https://www.instagram.com/moneyloverapp/" target="_blank" rel="noopener noreferrer"
                               className="cursor-pointer hover:no-underline">
                            <svg width={32} height={32} viewBox="0 0 32 32" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 30.545C7.967 30.545 1.455 24.033 1.455 16 1.455 7.967 7.967 1.455 16 1.455c8.033 0 14.545 6.512 14.545 14.545 0 8.033-6.512 14.545-14.545 14.545z"
                                    fill="#000" fillOpacity="0.54"/>
                                <path
                                    d="M20.364 8.727h-8.727a2.91 2.91 0 00-2.91 2.91v8.726a2.909 2.909 0 002.91 2.91h8.727a2.909 2.909 0 002.909-2.91v-8.727a2.909 2.909 0 00-2.91-2.909zm-1.455 2.182h2.182v2.182H18.91v-2.182zM16 13.09a2.91 2.91 0 110 5.818 2.91 2.91 0 010-5.818zm5.818 7.272c0 .804-.65 1.455-1.454 1.455h-8.727a1.455 1.455 0 01-1.455-1.455v-5.09h1.527a4.364 4.364 0 108.582 0h1.527v5.09z"
                                    fill="#000" fillOpacity="0.54"/>
                            </svg>
                        </a></li>
                        <li><a href="https://www.twitter.com/moneyloverapp" target="_blank" rel="noopener noreferrer"
                               className="cursor-pointer hover:no-underline">
                            <svg width={32} height={32} viewBox="0 0 32 32" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M23.6 10.4a6.046 6.046 0 01-1.898.727 3.004 3.004 0 00-2.182-.93 2.96 2.96 0 00-2.982 2.908c0 .226.028.45.08.67a8.517 8.517 0 01-6.153-3.07 2.91 2.91 0 00-.407 1.455c0 .988.501 1.908 1.331 2.444a3.012 3.012 0 01-1.353-.371v.036a2.953 2.953 0 002.393 2.91 3.05 3.05 0 01-1.345.05 2.982 2.982 0 002.785 2.037 6.044 6.044 0 01-4.414 1.229 8.545 8.545 0 004.574 1.323 8.364 8.364 0 008.517-8.356v-.378A6.046 6.046 0 0024 11.564a6.035 6.035 0 01-1.716.465A2.96 2.96 0 0023.6 10.4z"
                                    fill="#000" fillOpacity="0.54"/>
                                <path
                                    d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 30.545C7.967 30.545 1.455 24.033 1.455 16 1.455 7.967 7.967 1.455 16 1.455c8.033 0 14.545 6.512 14.545 14.545 0 8.033-6.512 14.545-14.545 14.545z"
                                    fill="#000" fillOpacity="0.54"/>
                            </svg>
                        </a></li>
                    </ul>
                </section>
            </footer>
        </motion.div>
    );
};

export default UserHomePage;