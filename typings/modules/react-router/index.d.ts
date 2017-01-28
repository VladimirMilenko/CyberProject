// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/Router.d.ts
declare module '~react-router/lib/Router' {
import * as React from 'react';
import RouterContext from '~react-router/lib/RouterContext';
import {
    QueryString, Query,
    Location, LocationDescriptor, LocationState as HLocationState,
    History, Href,
    Pathname, Path } from 'history';

const Router: Router;
interface Router extends React.ComponentClass<Router.RouterProps> { }

export default Router;

// types based on https://github.com/rackt/react-router/blob/master/docs/Glossary.md

namespace Router {
    type RouteConfig = React.ReactNode | PlainRoute | PlainRoute[];
    type RoutePattern = string;
    interface RouteComponents { [key: string]: RouteComponent; }

    type ParseQueryString = (queryString: QueryString) => Query;
    type StringifyQuery = (queryObject: Query) => QueryString;

    type Component = React.ReactType;
    type RouteComponent = Component;

    type EnterHook = (nextState: RouterState, replace: RedirectFunction, callback?: Function) => void;
    type LeaveHook = () => void;
    type ChangeHook = (prevState: RouterState, nextState: RouterState, replace: RedirectFunction, callback: Function) => void;
    type RouteHook = (nextLocation?: Location) => any;

    interface Params { [param: string]: string; }

    type RouterListener = (error: Error, nextState: RouterState) => void;

    interface LocationDescriptor {
        pathname?: Pathname;
        query?: Query;
        hash?: Href;
        state?: HLocationState;
    }

    interface RedirectFunction {
        (location: LocationDescriptor): void;
        /**
        * @deprecated `replaceState(state, pathname, query) is deprecated; Use `replace(location)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated
        */
        (state: HLocationState, pathname: Pathname | Path, query?: Query): void;
    }

    interface RouterState {
        location: Location;
        routes: PlainRoute[];
        params: Params;
        components: RouteComponent[];
    }

    interface RouterProps extends React.Props<Router> {
        history?: History;
        routes?: RouteConfig; // alias for children
        createElement?: (component: RouteComponent, props: Object) => any;
        onError?: (error: any) => any;
        onUpdate?: () => any;
        parseQueryString?: ParseQueryString;
        stringifyQuery?: StringifyQuery;
        basename?: string;
        render?: (renderProps: React.Props<{}>) => RouterContext;
    }

    interface PlainRoute {
        path?: RoutePattern;
        component?: RouteComponent;
        components?: RouteComponents;
        getComponent?: (location: Location, cb: (error: any, component?: RouteComponent) => void) => void;
        getComponents?: (location: Location, cb: (error: any, components?: RouteComponents) => void) => void;
        onEnter?: EnterHook;
        onLeave?: LeaveHook;
        indexRoute?: PlainRoute;
        getIndexRoute?: (location: Location, cb: (error: any, indexRoute: RouteConfig) => void) => void;
        childRoutes?: PlainRoute[];
        getChildRoutes?: (location: Location, cb: (error: any, childRoutes: RouteConfig) => void) => void;
    }

    interface RouteComponentProps<P, R> {
        history?: History;
        location?: Location;
        params?: P;
        route?: PlainRoute;
        routeParams?: R;
        routes?: PlainRoute[];
        children?: React.ReactElement<any>;
    }

    interface RouterOnContext extends History {
        setRouteLeaveHook(route: PlainRoute, hook?: RouteHook): () => void;
        isActive(pathOrLoc: Path | LocationDescriptor, indexOnly?: boolean): boolean;
    }

    // Wrap a component using withRouter(Component) to provide a router object
    // to the Component's props, allowing the Component to programmatically call
    // push and other functions.
    //
    // https://github.com/reactjs/react-router/blob/v2.4.0/upgrade-guides/v2.4.0.md

    interface InjectedRouter {
        push: (pathOrLoc: Path | LocationDescriptor) => void;
        replace: (pathOrLoc: Path | LocationDescriptor) => void;
        go: (n: number) => void;
        goBack: () => void;
        goForward: () => void;
        setRouteLeaveHook(route: PlainRoute, callback: RouteHook): void;
        createPath(path: History.Path, query?: History.Query): History.Path;
        createHref(path: History.Path, query?: History.Query): History.Href;
        isActive: (pathOrLoc: Path | LocationDescriptor, indexOnly?: boolean) => boolean;
    }
}
}
declare module 'react-router/lib/Router' {
export { default } from '~react-router/lib/Router';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/Link.d.ts
declare module '~react-router/lib/Link' {
import * as React from 'react';
import Router from '~react-router/lib/Router';

const Link: Link;
type Link = Link.Link;

export default Link;

namespace Link {
    interface LinkProps extends React.HTMLAttributes<Link> {
        activeStyle?: React.CSSProperties;
        activeClassName?: string;
        onlyActiveOnIndex?: boolean;
        to: Router.RoutePattern | Router.LocationDescriptor | ((...args: any[]) => Router.LocationDescriptor);
    }

    interface Link extends React.ComponentClass<LinkProps> {}
    interface LinkElement extends React.ReactElement<LinkProps> {}
}
}
declare module 'react-router/lib/Link' {
export { default } from '~react-router/lib/Link';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/IndexLink.d.ts
declare module '~react-router/lib/IndexLink' {
import Link from '~react-router/lib/Link';

const IndexLink: Link;
export default IndexLink;
}
declare module 'react-router/lib/IndexLink' {
export { default } from '~react-router/lib/IndexLink';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/IndexRedirect.d.ts
declare module '~react-router/lib/IndexRedirect' {
import Router from '~react-router/lib/Router';
import * as React from 'react';
import * as H from 'history';

const self: self.IndexRedirect;
type self = self.IndexRedirect;
export default self;

namespace self {
	interface IndexRedirectProps extends React.Props<self> {
	    to: Router.RoutePattern;
	    query?: H.Query;
	    state?: H.LocationState;
	}
	interface IndexRedirectElement extends React.ReactElement<IndexRedirectProps> { }
	interface IndexRedirect extends React.ComponentClass<self.IndexRedirectProps> { }
}
}
declare module 'react-router/lib/IndexRedirect' {
export { default } from '~react-router/lib/IndexRedirect';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/IndexRoute.d.ts
declare module '~react-router/lib/IndexRoute' {
import * as React from 'react';
import Router from '~react-router/lib/Router';
import * as H from 'history';

const self: self.IndexRoute;
type self = self.IndexRoute;
export default self;

namespace self {
    interface IndexRouteProps extends React.Props<IndexRoute> {
        component?: Router.RouteComponent;
        components?: Router.RouteComponents;
        getComponent?: (location: H.Location, cb: (error: any, component?: Router.RouteComponent) => void) => void;
        getComponents?: (location: H.Location, cb: (error: any, components?: Router.RouteComponents) => void) => void;
        onEnter?: Router.EnterHook;
        onLeave?: Router.LeaveHook;
    }
    interface IndexRoute extends React.ComponentClass<IndexRouteProps> { }
    interface IndexRouteElement extends React.ReactElement<IndexRouteProps> { }
}
}
declare module 'react-router/lib/IndexRoute' {
export { default } from '~react-router/lib/IndexRoute';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/Redirect.d.ts
declare module '~react-router/lib/Redirect' {
import * as React from 'react';
import Router from '~react-router/lib/Router';
import * as H from 'history';

const self: self.Redirect;
type self = typeof self;
export default self;

namespace self {
    interface RedirectProps extends React.Props<Redirect> {
        path?: Router.RoutePattern;
        from?: Router.RoutePattern; // alias for path
        to: Router.RoutePattern;
        query?: H.Query;
        state?: H.LocationState;
    }
    interface Redirect extends React.ComponentClass<RedirectProps> { }
    interface RedirectElement extends React.ReactElement<RedirectProps> { }
}
}
declare module 'react-router/lib/Redirect' {
export { default } from '~react-router/lib/Redirect';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/Route.d.ts
declare module '~react-router/lib/Route' {
import * as React from 'react';
import Router from '~react-router/lib/Router';
import { Location } from 'history';

const self: self.Route;
type self = self.Route;
export default self;

namespace self {

    interface RouteProps extends React.Props<Route> {
        path?: Router.RoutePattern;
        component?: Router.RouteComponent;
        components?: Router.RouteComponents;
        getComponent?: (nextState: Router.RouterState, cb: (error: any, component?: Router.RouteComponent) => void) => void;
        getComponents?: (nextState: Router.RouterState, cb: (error: any, components?: Router.RouteComponents) => void) => void;
        onEnter?: Router.EnterHook;
        onLeave?: Router.LeaveHook;
        onChange?: Router.ChangeHook;
        getIndexRoute?: (location: Location, cb: (error: any, indexRoute: Router.RouteConfig) => void) => void;
        getChildRoutes?: (location: Location, cb: (error: any, childRoutes: Router.RouteConfig) => void) => void;
    }
    interface Route extends React.ComponentClass<RouteProps> {}
    interface RouteElement extends React.ReactElement<RouteProps> {}
}
}
declare module 'react-router/lib/Route' {
export { default } from '~react-router/lib/Route';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/routerHistory.d.ts
declare module '~react-router/lib/routerHistory' {
import Router from '~react-router/lib/Router';
import * as H from 'history';

export default History;

export interface HistoryRoutes {
    listen(listener: Router.RouterListener): Function;
    listenBeforeLeavingRoute(route: Router.PlainRoute, hook: Router.RouteHook): void;
    match(location: H.Location, callback: (error: any, nextState: Router.RouterState, nextLocation: H.Location) => void): void;
    isActive(pathname: H.Pathname, query?: H.Query, indexOnly?: boolean): boolean;
    setRouteLeaveHook(route: Router.PlainRoute, callback: Router.RouteHook): void;
}

export interface HistoryBase extends H.History {
    routes: Router.PlainRoute[];
    parseQueryString?: Router.ParseQueryString;
    stringifyQuery?: Router.StringifyQuery;
}

export type History = HistoryBase & H.HistoryQueries & HistoryRoutes;
export const browserHistory: History;
export const hashHistory: History;
}
declare module 'react-router/lib/routerHistory' {
export * from '~react-router/lib/routerHistory';
export { default } from '~react-router/lib/routerHistory';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/Lifecycle.d.ts
declare module '~react-router/lib/Lifecycle' {
import * as React from 'react';

const Lifecycle: React.Mixin<any, any>;
export default Lifecycle;
}
declare module 'react-router/lib/Lifecycle' {
export { default } from '~react-router/lib/Lifecycle';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/RouteContext.d.ts
declare module '~react-router/lib/RouteContext' {
import * as React from 'react';

const RouteContext: React.Mixin<any, any>;
export default RouteContext;
}
declare module 'react-router/lib/RouteContext' {
export { default } from '~react-router/lib/RouteContext';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/browserHistory.d.ts
declare module '~react-router/lib/browserHistory' {
import { History } from '~react-router/lib/routerHistory';
const browserHistory: History;
export default browserHistory;
}
declare module 'react-router/lib/browserHistory' {
export { default } from '~react-router/lib/browserHistory';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/hashHistory.d.ts
declare module '~react-router/lib/hashHistory' {
import { History } from '~react-router/lib/routerHistory';
const hashHistory: History;
export default hashHistory;
}
declare module 'react-router/lib/hashHistory' {
export { default } from '~react-router/lib/hashHistory';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/useRoutes.d.ts
declare module '~react-router/lib/useRoutes' {
import * as H from 'history';
import { HistoryRoutes } from '~react-router/lib/routerHistory';

function useRoutes<T>(createHistory: H.CreateHistory<T>): H.CreateHistory<T & HistoryRoutes>;
export default useRoutes;
}
declare module 'react-router/lib/useRoutes' {
export { default } from '~react-router/lib/useRoutes';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/RouteUtils.d.ts
declare module '~react-router/lib/RouteUtils' {
import * as React from 'react';
import Router from '~react-router/lib/Router';

type E = React.ReactElement<any>;
export function isReactChildren(object: E | E[]): boolean;
export function createRouteFromReactElement(element: E): Router.PlainRoute;
export function createRoutesFromReactChildren(children: E | E[], parentRoute: Router.PlainRoute): Router.PlainRoute[];
export function createRoutes(routes: Router.RouteConfig): Router.PlainRoute[];
}
declare module 'react-router/lib/RouteUtils' {
export * from '~react-router/lib/RouteUtils';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/PatternUtils.d.ts
declare module '~react-router/lib/PatternUtils' {
export function formatPattern(pattern: string, params: {}): string;
}
declare module 'react-router/lib/PatternUtils' {
export * from '~react-router/lib/PatternUtils';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/RouterContext.d.ts
declare module '~react-router/lib/RouterContext' {
import * as React from 'react';
import * as H from 'history';
import Router from '~react-router/lib/Router';

const self: self.RouterContext;
type self = self.RouterContext;
export default self;

namespace self {
    interface RouterContextProps extends React.Props<RouterContext> {
        history?: H.History;
        router: Router;
        createElement: (component: Router.RouteComponent, props: Object) => any;
        location: H.Location;
        routes: Router.RouteConfig;
        params: Router.Params;
        components?: Router.RouteComponent[];
    }
    interface RouterContext extends React.ComponentClass<RouterContextProps> {}
    interface RouterContextElement extends React.ReactElement<RouterContextProps> {
        history?: H.History;
        location: H.Location;
        router?: Router;
    }
}
}
declare module 'react-router/lib/RouterContext' {
export { default } from '~react-router/lib/RouterContext';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/PropTypes.d.ts
declare module '~react-router/lib/PropTypes' {
import * as React from 'react';

export function falsy(props: any, propName: string, componentName: string): Error;
export const history: React.Requireable<any>;
export const location: React.Requireable<any>;
export const component: React.Requireable<any>;
export const components: React.Requireable<any>;
export const route: React.Requireable<any>;
export const routes: React.Requireable<any>;

export default {
    falsy,
    history,
    location,
    component,
    components,
    route
};
}
declare module 'react-router/lib/PropTypes' {
export * from '~react-router/lib/PropTypes';
export { default } from '~react-router/lib/PropTypes';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/match.d.ts
declare module '~react-router/lib/match' {
import * as H from 'history';
import Router from '~react-router/lib/Router';

interface MatchArgs {
    routes?: Router.RouteConfig;
    history?: H.History;
    location?: H.Location | string;
    parseQueryString?: Router.ParseQueryString;
    stringifyQuery?: Router.StringifyQuery;
}
interface MatchState extends Router.RouterState {
    history: H.History;
    router: Router;
    createElement: (component: Router.RouteComponent, props: Object) => any;
}
export default function match(args: MatchArgs, cb: (error: any, nextLocation: H.Location, nextState: MatchState) => void): void;
}
declare module 'react-router/lib/match' {
export * from '~react-router/lib/match';
export { default } from '~react-router/lib/match';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/useRouterHistory.d.ts
declare module '~react-router/lib/useRouterHistory' {
import { History, HistoryOptions, HistoryQueries, CreateHistory } from 'history';

export default function useRouterHistory<T>(createHistory: CreateHistory<T>): (options?: HistoryOptions) => History & HistoryQueries;
}
declare module 'react-router/lib/useRouterHistory' {
export * from '~react-router/lib/useRouterHistory';
export { default } from '~react-router/lib/useRouterHistory';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/createMemoryHistory.d.ts
declare module '~react-router/lib/createMemoryHistory' {
import * as H from 'history';

export default function createMemoryHistory(options?: H.HistoryOptions): H.History;
}
declare module 'react-router/lib/createMemoryHistory' {
export * from '~react-router/lib/createMemoryHistory';
export { default } from '~react-router/lib/createMemoryHistory';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/withRouter.d.ts
declare module '~react-router/lib/withRouter' {
import * as React from 'react';

function withRouter<C extends React.ComponentClass<any> | React.StatelessComponent<any> | React.PureComponent<any, any>>(component: C): C;
export default withRouter;
}
declare module 'react-router/lib/withRouter' {
export { default } from '~react-router/lib/withRouter';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/lib/applyRouterMiddleware.d.ts
declare module '~react-router/lib/applyRouterMiddleware' {
import * as React from 'react';
import Router from '~react-router/lib/Router';
import RouterContext from '~react-router/lib/RouterContext';

export interface Middleware {
    renderRouterContext?: (previous: RouterContext, props: React.Props<{}>) => RouterContext;
    renderRouteComponent?: (previous: Router.RouteComponent, props: React.Props<{}>) => Router.RouteComponent;
}
export default function applyRouterMiddleware(...middlewares: Middleware[]): (renderProps: React.Props<{}>) => RouterContext;
}
declare module 'react-router/lib/applyRouterMiddleware' {
export * from '~react-router/lib/applyRouterMiddleware';
export { default } from '~react-router/lib/applyRouterMiddleware';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/60e56c268fa43cee750cd410275f6d32dd4cf478/react-router/index.d.ts
declare module '~react-router/index' {
// Type definitions for react-router 2.0
// Project: https://github.com/rackt/react-router
// Definitions by: Sergey Buturlakin <https://github.com/sergey-buturlakin>, Yuichi Murata <https://github.com/mrk21>, Václav Ostrožlík <https://github.com/vasek17>, Nathan Brown <https://github.com/ngbrown>, Alex Wendland <https://github.com/awendland>, Kostya Esmukov <https://github.com/KostyaEsmukov>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="history" />

export as namespace ReactRouter;

import * as React from 'react';

export const routerShape: React.Requireable<any>;

export const locationShape: React.Requireable<any>;

import Router from '~react-router/lib/Router';
import Link from '~react-router/lib/Link';
import IndexLink from '~react-router/lib/IndexLink';
import IndexRedirect from '~react-router/lib/IndexRedirect';
import IndexRoute from '~react-router/lib/IndexRoute';
import Redirect from '~react-router/lib/Redirect';
import Route from '~react-router/lib/Route';
import * as History from '~react-router/lib/routerHistory';
import Lifecycle from '~react-router/lib/Lifecycle';
import RouteContext from '~react-router/lib/RouteContext';
import browserHistory from '~react-router/lib/browserHistory';
import hashHistory from '~react-router/lib/hashHistory';
import useRoutes from '~react-router/lib/useRoutes';
import { createRoutes } from '~react-router/lib/RouteUtils';
import { formatPattern } from '~react-router/lib/PatternUtils';
import RouterContext from '~react-router/lib/RouterContext';
import PropTypes from '~react-router/lib/PropTypes';
import match from '~react-router/lib/match';
import useRouterHistory from '~react-router/lib/useRouterHistory';
import createMemoryHistory from '~react-router/lib/createMemoryHistory';
import withRouter from '~react-router/lib/withRouter';
import applyRouterMiddleware from '~react-router/lib/applyRouterMiddleware';

// PlainRoute is defined in the API documented at:
// https://github.com/rackt/react-router/blob/master/docs/API.md
// but not included in any of the .../lib modules above.
export type PlainRoute = Router.PlainRoute;

// The following definitions are also very useful to export
// because by using these types lots of potential type errors
// can be exposed:
export type EnterHook = Router.EnterHook;
export type LeaveHook = Router.LeaveHook;
export type ParseQueryString = Router.ParseQueryString;
export type LocationDescriptor = Router.LocationDescriptor;
export type RedirectFunction = Router.RedirectFunction;
export type RouteComponent = Router.RouteComponent;
export type RouteComponentProps<P, R> = Router.RouteComponentProps<P, R>;
export type RouteConfig = Router.RouteConfig;
export type RouteHook = Router.RouteHook;
export type StringifyQuery = Router.StringifyQuery;
export type RouterListener = Router.RouterListener;
export type RouterState = Router.RouterState;
export type InjectedRouter = Router.InjectedRouter;

export type HistoryBase = History.HistoryBase;
export type RouterOnContext = Router.RouterOnContext;
export type RouteProps = Route.RouteProps;
export type LinkProps = Link.LinkProps;

export {
    Router,
    Link,
    IndexLink,
    IndexRedirect,
    IndexRoute,
    Redirect,
    Route,
    History,
    browserHistory,
    hashHistory,
    Lifecycle,
    RouteContext,
    useRoutes,
    createRoutes,
    formatPattern,
    RouterContext,
    PropTypes,
    match,
    useRouterHistory,
    createMemoryHistory,
    withRouter,
    applyRouterMiddleware
};

export default Router;
}
declare module 'react-router/index' {
export * from '~react-router/index';
export { default } from '~react-router/index';
}
declare module 'react-router' {
export * from '~react-router/index';
export { default } from '~react-router/index';
}
