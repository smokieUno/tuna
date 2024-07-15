import {Outlet} from "react-router-dom";
import routesPaths from "../routes/routesPaths";
import React from "react";
import "./top-navigation.scss";
import "./content-pages.scss";
import TopNavigationLink from "./TopNavigationLink";
import {observer} from "mobx-react-lite";
import {userSession} from "../../models/users/userSession";
import {MouseEvent} from "react/index";

const ContentPagesLayout = observer(({className}: {className?: string | undefined}) => {
    function getClassName(blockCssClass: string = 'app-root') {
        return className === undefined
            ? blockCssClass
            : `${blockCssClass} ${className}`;
    }

    async function logout(e: MouseEvent<any>) {
        e.preventDefault();
        await userSession.unAuth();
    }

    return (
        <div className={getClassName()}>
            <div className="top-navigation">
                <nav className="top-navigation__items">
                    <TopNavigationLink to={routesPaths.home} tid="tn__home-link">home</TopNavigationLink>
                    {userSession.authenticated
                        && <TopNavigationLink to={routesPaths.editor} tid="tn__editor-link">editor</TopNavigationLink>}
                    {!userSession.authenticated
                        && <TopNavigationLink to={routesPaths.login} tid="tn__login-link">login</TopNavigationLink>}
                    {userSession.authenticated
                        && <a href="#" className="top-navigation__link" onClick={logout}>logout</a> }
                </nav>
            </div>
            <main className="app-main">
                <Outlet />
            </main>
        </div>
    );
});

export default ContentPagesLayout;