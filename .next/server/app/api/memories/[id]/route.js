"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/memories/[id]/route";
exports.ids = ["app/api/memories/[id]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist\\client\\components\\action-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist\\client\\components\\request-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!*********************************************************************************************!*\
  !*** external "next/dist\\client\\components\\static-generation-async-storage.external.js" ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\static-generation-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fmemories%2F%5Bid%5D%2Froute&page=%2Fapi%2Fmemories%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmemories%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5CADMIN%5CSide%20Projects%5CSide-Project%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CADMIN%5CSide%20Projects%5CSide-Project&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fmemories%2F%5Bid%5D%2Froute&page=%2Fapi%2Fmemories%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmemories%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5CADMIN%5CSide%20Projects%5CSide-Project%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CADMIN%5CSide%20Projects%5CSide-Project&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_ADMIN_Side_Projects_Side_Project_app_api_memories_id_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/memories/[id]/route.ts */ \"(rsc)/./app/api/memories/[id]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/memories/[id]/route\",\n        pathname: \"/api/memories/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/memories/[id]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\ADMIN\\\\Side Projects\\\\Side-Project\\\\app\\\\api\\\\memories\\\\[id]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_ADMIN_Side_Projects_Side_Project_app_api_memories_id_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/memories/[id]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZtZW1vcmllcyUyRiU1QmlkJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkZtZW1vcmllcyUyRiU1QmlkJTVEJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGbWVtb3JpZXMlMkYlNUJpZCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNBRE1JTiU1Q1NpZGUlMjBQcm9qZWN0cyU1Q1NpZGUtUHJvamVjdCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDQURNSU4lNUNTaWRlJTIwUHJvamVjdHMlNUNTaWRlLVByb2plY3QmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDaUM7QUFDOUc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1R0FBdUc7QUFDL0c7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUM2Sjs7QUFFN0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZW1vcnktYXBwLz82OTc5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXEFETUlOXFxcXFNpZGUgUHJvamVjdHNcXFxcU2lkZS1Qcm9qZWN0XFxcXGFwcFxcXFxhcGlcXFxcbWVtb3JpZXNcXFxcW2lkXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvbWVtb3JpZXMvW2lkXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL21lbW9yaWVzL1tpZF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL21lbW9yaWVzL1tpZF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxBRE1JTlxcXFxTaWRlIFByb2plY3RzXFxcXFNpZGUtUHJvamVjdFxcXFxhcHBcXFxcYXBpXFxcXG1lbW9yaWVzXFxcXFtpZF1cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0IH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvbWVtb3JpZXMvW2lkXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fmemories%2F%5Bid%5D%2Froute&page=%2Fapi%2Fmemories%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmemories%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5CADMIN%5CSide%20Projects%5CSide-Project%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CADMIN%5CSide%20Projects%5CSide-Project&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_2__.PrismaClient();\nconst authOptions = {\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_3__.PrismaAdapter)(prisma),\n    session: {\n        strategy: \"jwt\"\n    },\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                },\n                name: {\n                    label: \"Name\",\n                    type: \"text\",\n                    optional: true\n                },\n                isSignUp: {\n                    label: \"Sign Up\",\n                    type: \"hidden\",\n                    optional: true\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) return null;\n                // Sign Up\n                if (credentials.isSignUp === \"true\") {\n                    const existing = await prisma.user.findUnique({\n                        where: {\n                            email: credentials.email\n                        }\n                    });\n                    if (existing) throw new Error(\"Email already in use\");\n                    const hashed = await (0,bcryptjs__WEBPACK_IMPORTED_MODULE_4__.hash)(credentials.password, 10);\n                    const user = await prisma.user.create({\n                        data: {\n                            email: credentials.email,\n                            name: credentials.name,\n                            password: hashed\n                        }\n                    });\n                    return {\n                        id: user.id,\n                        email: user.email,\n                        name: user.name\n                    };\n                }\n                // Sign In\n                const user = await prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) throw new Error(\"No user found\");\n                const valid = await (0,bcryptjs__WEBPACK_IMPORTED_MODULE_4__.compare)(credentials.password, user.password);\n                if (!valid) throw new Error(\"Invalid password\");\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name\n                };\n            }\n        })\n    ],\n    pages: {\n        signIn: \"/\"\n    },\n    callbacks: {\n        async session ({ session, token }) {\n            if (token && session.user) {\n                session.user.id = token.sub;\n            }\n            return session;\n        }\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQWdDO0FBQ2lDO0FBQ3BCO0FBQ1k7QUFDakI7QUFJeEMsTUFBTU0sU0FBUyxJQUFJSix3REFBWUE7QUFFeEIsTUFBTUssY0FBYztJQUN6QkMsU0FBU0wsd0VBQWFBLENBQUNHO0lBQ3ZCRyxTQUFTO1FBQ1BDLFVBQVU7SUFDWjtJQUNBQyxXQUFXO1FBQ1RWLDJFQUFtQkEsQ0FBQztZQUNsQlcsTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztnQkFDaERKLE1BQU07b0JBQUVHLE9BQU87b0JBQVFDLE1BQU07b0JBQVFFLFVBQVU7Z0JBQUs7Z0JBQ3BEQyxVQUFVO29CQUFFSixPQUFPO29CQUFXQyxNQUFNO29CQUFVRSxVQUFVO2dCQUFLO1lBQy9EO1lBQ0EsTUFBTUUsV0FBVVAsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVUsT0FBTztnQkFDMUQsVUFBVTtnQkFDVixJQUFJSixZQUFZTSxRQUFRLEtBQUssUUFBUTtvQkFDbkMsTUFBTUUsV0FBVyxNQUFNZixPQUFPZ0IsSUFBSSxDQUFDQyxVQUFVLENBQUM7d0JBQUVDLE9BQU87NEJBQUVWLE9BQU9ELFlBQVlDLEtBQUs7d0JBQUM7b0JBQUU7b0JBQ3BGLElBQUlPLFVBQVUsTUFBTSxJQUFJSSxNQUFNO29CQUM5QixNQUFNQyxTQUFTLE1BQU1yQiw4Q0FBSUEsQ0FBQ1EsWUFBWUksUUFBUSxFQUFFO29CQUNoRCxNQUFNSyxPQUFPLE1BQU1oQixPQUFPZ0IsSUFBSSxDQUFDSyxNQUFNLENBQUM7d0JBQ3BDQyxNQUFNOzRCQUNKZCxPQUFPRCxZQUFZQyxLQUFLOzRCQUN4QkYsTUFBTUMsWUFBWUQsSUFBSTs0QkFDdEJLLFVBQVVTO3dCQUNaO29CQUNGO29CQUNBLE9BQU87d0JBQUVHLElBQUlQLEtBQUtPLEVBQUU7d0JBQUVmLE9BQU9RLEtBQUtSLEtBQUs7d0JBQUVGLE1BQU1VLEtBQUtWLElBQUk7b0JBQUM7Z0JBQzNEO2dCQUNBLFVBQVU7Z0JBQ1YsTUFBTVUsT0FBTyxNQUFNaEIsT0FBT2dCLElBQUksQ0FBQ0MsVUFBVSxDQUFDO29CQUFFQyxPQUFPO3dCQUFFVixPQUFPRCxZQUFZQyxLQUFLO29CQUFDO2dCQUFFO2dCQUNoRixJQUFJLENBQUNRLE1BQU0sTUFBTSxJQUFJRyxNQUFNO2dCQUMzQixNQUFNSyxRQUFRLE1BQU0xQixpREFBT0EsQ0FBQ1MsWUFBWUksUUFBUSxFQUFFSyxLQUFLTCxRQUFRO2dCQUMvRCxJQUFJLENBQUNhLE9BQU8sTUFBTSxJQUFJTCxNQUFNO2dCQUM1QixPQUFPO29CQUFFSSxJQUFJUCxLQUFLTyxFQUFFO29CQUFFZixPQUFPUSxLQUFLUixLQUFLO29CQUFFRixNQUFNVSxLQUFLVixJQUFJO2dCQUFDO1lBQzNEO1FBQ0Y7S0FDRDtJQUNEbUIsT0FBTztRQUNMQyxRQUFRO0lBQ1Y7SUFDQUMsV0FBVztRQUNULE1BQU14QixTQUFRLEVBQUVBLE9BQU8sRUFBRXlCLEtBQUssRUFBb0M7WUFDaEUsSUFBSUEsU0FBU3pCLFFBQVFhLElBQUksRUFBRTtnQkFDeEJiLFFBQVFhLElBQUksQ0FBU08sRUFBRSxHQUFHSyxNQUFNQyxHQUFHO1lBQ3RDO1lBQ0EsT0FBTzFCO1FBQ1Q7SUFDRjtJQUNBMkIsUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyxlQUFlO0FBQ3JDLEVBQUM7QUFFRCxNQUFNQyxVQUFVeEMsZ0RBQVFBLENBQUNPO0FBQ2lCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVtb3J5LWFwcC8uL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzP2M4YTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIlxyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiXHJcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiXHJcbmltcG9ydCB7IFByaXNtYUFkYXB0ZXIgfSBmcm9tIFwiQG5leHQtYXV0aC9wcmlzbWEtYWRhcHRlclwiXHJcbmltcG9ydCB7IGNvbXBhcmUsIGhhc2ggfSBmcm9tIFwiYmNyeXB0anNcIlxyXG5pbXBvcnQgdHlwZSB7IFNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCJcclxuaW1wb3J0IHR5cGUgeyBKV1QgfSBmcm9tIFwibmV4dC1hdXRoL2p3dFwiXHJcblxyXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KClcclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9ucyA9IHtcclxuICBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKHByaXNtYSksXHJcbiAgc2Vzc2lvbjoge1xyXG4gICAgc3RyYXRlZ3k6IFwiand0XCIgYXMgY29uc3QsXHJcbiAgfSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH0sXHJcbiAgICAgICAgbmFtZTogeyBsYWJlbDogXCJOYW1lXCIsIHR5cGU6IFwidGV4dFwiLCBvcHRpb25hbDogdHJ1ZSB9LFxyXG4gICAgICAgIGlzU2lnblVwOiB7IGxhYmVsOiBcIlNpZ24gVXBcIiwgdHlwZTogXCJoaWRkZW5cIiwgb3B0aW9uYWw6IHRydWUgfSxcclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkgcmV0dXJuIG51bGxcclxuICAgICAgICAvLyBTaWduIFVwXHJcbiAgICAgICAgaWYgKGNyZWRlbnRpYWxzLmlzU2lnblVwID09PSBcInRydWVcIikge1xyXG4gICAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHsgd2hlcmU6IHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsIH0gfSlcclxuICAgICAgICAgIGlmIChleGlzdGluZykgdGhyb3cgbmV3IEVycm9yKFwiRW1haWwgYWxyZWFkeSBpbiB1c2VcIilcclxuICAgICAgICAgIGNvbnN0IGhhc2hlZCA9IGF3YWl0IGhhc2goY3JlZGVudGlhbHMucGFzc3dvcmQsIDEwKVxyXG4gICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwsXHJcbiAgICAgICAgICAgICAgbmFtZTogY3JlZGVudGlhbHMubmFtZSxcclxuICAgICAgICAgICAgICBwYXNzd29yZDogaGFzaGVkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHJldHVybiB7IGlkOiB1c2VyLmlkLCBlbWFpbDogdXNlci5lbWFpbCwgbmFtZTogdXNlci5uYW1lIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2lnbiBJblxyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHsgd2hlcmU6IHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsIH0gfSlcclxuICAgICAgICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIk5vIHVzZXIgZm91bmRcIilcclxuICAgICAgICBjb25zdCB2YWxpZCA9IGF3YWl0IGNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpXHJcbiAgICAgICAgaWYgKCF2YWxpZCkgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBwYXNzd29yZFwiKVxyXG4gICAgICAgIHJldHVybiB7IGlkOiB1c2VyLmlkLCBlbWFpbDogdXNlci5lbWFpbCwgbmFtZTogdXNlci5uYW1lIH1cclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogXCIvXCIsIC8vIFdlJ2xsIHVzZSBhIG1vZGFsLCBzbyB0aGlzIGNhbiBiZSB0aGUgbGFuZGluZyBwYWdlXHJcbiAgfSxcclxuICBjYWxsYmFja3M6IHtcclxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9OiB7IHNlc3Npb246IFNlc3Npb247IHRva2VuOiBKV1QgfSkge1xyXG4gICAgICBpZiAodG9rZW4gJiYgc2Vzc2lvbi51c2VyKSB7XHJcbiAgICAgICAgKHNlc3Npb24udXNlciBhcyBhbnkpLmlkID0gdG9rZW4uc3ViXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHNlc3Npb25cclxuICAgIH0sXHJcbiAgfSxcclxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcclxufVxyXG5cclxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKVxyXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH0gIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsIlByaXNtYUNsaWVudCIsIlByaXNtYUFkYXB0ZXIiLCJjb21wYXJlIiwiaGFzaCIsInByaXNtYSIsImF1dGhPcHRpb25zIiwiYWRhcHRlciIsInNlc3Npb24iLCJzdHJhdGVneSIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJvcHRpb25hbCIsImlzU2lnblVwIiwiYXV0aG9yaXplIiwiZXhpc3RpbmciLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiRXJyb3IiLCJoYXNoZWQiLCJjcmVhdGUiLCJkYXRhIiwiaWQiLCJ2YWxpZCIsInBhZ2VzIiwic2lnbkluIiwiY2FsbGJhY2tzIiwidG9rZW4iLCJzdWIiLCJzZWNyZXQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVEFVVEhfU0VDUkVUIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/api/memories/[id]/route.ts":
/*!****************************************!*\
  !*** ./app/api/memories/[id]/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PATCH: () => (/* binding */ PATCH)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _auth_nextauth_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../auth/[...nextauth]/route */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_3__.PrismaClient();\nasync function GET(req, { params }) {\n    const memory = await prisma.memory.findUnique({\n        where: {\n            id: params.id\n        },\n        include: {\n            author: true,\n            likes: true,\n            comments: true,\n            friends: true\n        }\n    });\n    if (!memory) return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n        error: \"Not found\"\n    }, {\n        status: 404\n    });\n    return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json(memory);\n}\nasync function PATCH(req, { params }) {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    const userId = (session?.user)?.id;\n    if (!userId) {\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    const data = await req.json();\n    const memory = await prisma.memory.update({\n        where: {\n            id: params.id,\n            authorId: userId\n        },\n        data: {\n            title: data.title,\n            description: data.description,\n            image: data.image,\n            date: new Date(data.date),\n            location: data.location,\n            category: data.category,\n            friends: {\n                deleteMany: {},\n                create: (data.friends || []).map((name)=>({\n                        name\n                    }))\n            }\n        },\n        include: {\n            author: true,\n            friends: true,\n            likes: true,\n            comments: true\n        }\n    });\n    return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json(memory);\n}\nasync function DELETE(req, { params }) {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    const userId = (session?.user)?.id;\n    if (!userId) {\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    await prisma.memory.delete({\n        where: {\n            id: params.id,\n            authorId: userId\n        }\n    });\n    return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n        success: true\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL21lbW9yaWVzL1tpZF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQXVEO0FBQ1g7QUFDZ0I7QUFDZjtBQUU3QyxNQUFNSSxTQUFTLElBQUlELHdEQUFZQTtBQUV4QixlQUFlRSxJQUFJQyxHQUFnQixFQUFFLEVBQUVDLE1BQU0sRUFBOEI7SUFDaEYsTUFBTUMsU0FBUyxNQUFNSixPQUFPSSxNQUFNLENBQUNDLFVBQVUsQ0FBQztRQUM1Q0MsT0FBTztZQUFFQyxJQUFJSixPQUFPSSxFQUFFO1FBQUM7UUFDdkJDLFNBQVM7WUFDUEMsUUFBUTtZQUNSQyxPQUFPO1lBQ1BDLFVBQVU7WUFDVkMsU0FBUztRQUNYO0lBQ0Y7SUFDQSxJQUFJLENBQUNSLFFBQVEsT0FBT1Isa0ZBQVlBLENBQUNpQixJQUFJLENBQUM7UUFBRUMsT0FBTztJQUFZLEdBQUc7UUFBRUMsUUFBUTtJQUFJO0lBQzVFLE9BQU9uQixrRkFBWUEsQ0FBQ2lCLElBQUksQ0FBQ1Q7QUFDM0I7QUFFTyxlQUFlWSxNQUFNZCxHQUFnQixFQUFFLEVBQUVDLE1BQU0sRUFBOEI7SUFDbEYsTUFBTWMsVUFBVSxNQUFNcEIsMkRBQWdCQSxDQUFDQyw2REFBV0E7SUFDbEQsTUFBTW9CLFNBQVMsQ0FBQ0QsU0FBU0UsSUFBVyxHQUFHWjtJQUN2QyxJQUFJLENBQUNXLFFBQVE7UUFDWCxPQUFPdEIsa0ZBQVlBLENBQUNpQixJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFlLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3BFO0lBQ0EsTUFBTUssT0FBTyxNQUFNbEIsSUFBSVcsSUFBSTtJQUMzQixNQUFNVCxTQUFTLE1BQU1KLE9BQU9JLE1BQU0sQ0FBQ2lCLE1BQU0sQ0FBQztRQUN4Q2YsT0FBTztZQUFFQyxJQUFJSixPQUFPSSxFQUFFO1lBQUVlLFVBQVVKO1FBQU87UUFDekNFLE1BQU07WUFDSkcsT0FBT0gsS0FBS0csS0FBSztZQUNqQkMsYUFBYUosS0FBS0ksV0FBVztZQUM3QkMsT0FBT0wsS0FBS0ssS0FBSztZQUNqQkMsTUFBTSxJQUFJQyxLQUFLUCxLQUFLTSxJQUFJO1lBQ3hCRSxVQUFVUixLQUFLUSxRQUFRO1lBQ3ZCQyxVQUFVVCxLQUFLUyxRQUFRO1lBQ3ZCakIsU0FBUztnQkFDUGtCLFlBQVksQ0FBQztnQkFDYkMsUUFBUSxDQUFDWCxLQUFLUixPQUFPLElBQUksRUFBRSxFQUFFb0IsR0FBRyxDQUFDLENBQUNDLE9BQWtCO3dCQUFFQTtvQkFBSztZQUM3RDtRQUNGO1FBQ0F6QixTQUFTO1lBQ1BDLFFBQVE7WUFDUkcsU0FBUztZQUNURixPQUFPO1lBQ1BDLFVBQVU7UUFDWjtJQUNGO0lBQ0EsT0FBT2Ysa0ZBQVlBLENBQUNpQixJQUFJLENBQUNUO0FBQzNCO0FBRU8sZUFBZThCLE9BQU9oQyxHQUFnQixFQUFFLEVBQUVDLE1BQU0sRUFBOEI7SUFDbkYsTUFBTWMsVUFBVSxNQUFNcEIsMkRBQWdCQSxDQUFDQyw2REFBV0E7SUFDbEQsTUFBTW9CLFNBQVMsQ0FBQ0QsU0FBU0UsSUFBVyxHQUFHWjtJQUN2QyxJQUFJLENBQUNXLFFBQVE7UUFDWCxPQUFPdEIsa0ZBQVlBLENBQUNpQixJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFlLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3BFO0lBQ0EsTUFBTWYsT0FBT0ksTUFBTSxDQUFDK0IsTUFBTSxDQUFDO1FBQUU3QixPQUFPO1lBQUVDLElBQUlKLE9BQU9JLEVBQUU7WUFBRWUsVUFBVUo7UUFBTztJQUFFO0lBQ3hFLE9BQU90QixrRkFBWUEsQ0FBQ2lCLElBQUksQ0FBQztRQUFFdUIsU0FBUztJQUFLO0FBQzNDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVtb3J5LWFwcC8uL2FwcC9hcGkvbWVtb3JpZXMvW2lkXS9yb3V0ZS50cz83MzQwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIlxyXG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aFwiXHJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIi4uLy4uL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXHJcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiXHJcblxyXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KClcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxOiBOZXh0UmVxdWVzdCwgeyBwYXJhbXMgfTogeyBwYXJhbXM6IHsgaWQ6IHN0cmluZyB9IH0pIHtcclxuICBjb25zdCBtZW1vcnkgPSBhd2FpdCBwcmlzbWEubWVtb3J5LmZpbmRVbmlxdWUoe1xyXG4gICAgd2hlcmU6IHsgaWQ6IHBhcmFtcy5pZCB9LFxyXG4gICAgaW5jbHVkZToge1xyXG4gICAgICBhdXRob3I6IHRydWUsXHJcbiAgICAgIGxpa2VzOiB0cnVlLFxyXG4gICAgICBjb21tZW50czogdHJ1ZSxcclxuICAgICAgZnJpZW5kczogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSlcclxuICBpZiAoIW1lbW9yeSkgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiTm90IGZvdW5kXCIgfSwgeyBzdGF0dXM6IDQwNCB9KVxyXG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihtZW1vcnkpXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQQVRDSChyZXE6IE5leHRSZXF1ZXN0LCB7IHBhcmFtcyB9OiB7IHBhcmFtczogeyBpZDogc3RyaW5nIH0gfSkge1xyXG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxyXG4gIGNvbnN0IHVzZXJJZCA9IChzZXNzaW9uPy51c2VyIGFzIGFueSk/LmlkXHJcbiAgaWYgKCF1c2VySWQpIHtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSlcclxuICB9XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcS5qc29uKClcclxuICBjb25zdCBtZW1vcnkgPSBhd2FpdCBwcmlzbWEubWVtb3J5LnVwZGF0ZSh7XHJcbiAgICB3aGVyZTogeyBpZDogcGFyYW1zLmlkLCBhdXRob3JJZDogdXNlcklkIH0sXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIHRpdGxlOiBkYXRhLnRpdGxlLFxyXG4gICAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjcmlwdGlvbixcclxuICAgICAgaW1hZ2U6IGRhdGEuaW1hZ2UsXHJcbiAgICAgIGRhdGU6IG5ldyBEYXRlKGRhdGEuZGF0ZSksXHJcbiAgICAgIGxvY2F0aW9uOiBkYXRhLmxvY2F0aW9uLFxyXG4gICAgICBjYXRlZ29yeTogZGF0YS5jYXRlZ29yeSxcclxuICAgICAgZnJpZW5kczoge1xyXG4gICAgICAgIGRlbGV0ZU1hbnk6IHt9LFxyXG4gICAgICAgIGNyZWF0ZTogKGRhdGEuZnJpZW5kcyB8fCBbXSkubWFwKChuYW1lOiBzdHJpbmcpID0+ICh7IG5hbWUgfSkpLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGluY2x1ZGU6IHtcclxuICAgICAgYXV0aG9yOiB0cnVlLFxyXG4gICAgICBmcmllbmRzOiB0cnVlLFxyXG4gICAgICBsaWtlczogdHJ1ZSxcclxuICAgICAgY29tbWVudHM6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0pXHJcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKG1lbW9yeSlcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIERFTEVURShyZXE6IE5leHRSZXF1ZXN0LCB7IHBhcmFtcyB9OiB7IHBhcmFtczogeyBpZDogc3RyaW5nIH0gfSkge1xyXG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxyXG4gIGNvbnN0IHVzZXJJZCA9IChzZXNzaW9uPy51c2VyIGFzIGFueSk/LmlkXHJcbiAgaWYgKCF1c2VySWQpIHtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSlcclxuICB9XHJcbiAgYXdhaXQgcHJpc21hLm1lbW9yeS5kZWxldGUoeyB3aGVyZTogeyBpZDogcGFyYW1zLmlkLCBhdXRob3JJZDogdXNlcklkIH0gfSlcclxuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pXHJcbn0gIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsIlByaXNtYUNsaWVudCIsInByaXNtYSIsIkdFVCIsInJlcSIsInBhcmFtcyIsIm1lbW9yeSIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlkIiwiaW5jbHVkZSIsImF1dGhvciIsImxpa2VzIiwiY29tbWVudHMiLCJmcmllbmRzIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiUEFUQ0giLCJzZXNzaW9uIiwidXNlcklkIiwidXNlciIsImRhdGEiLCJ1cGRhdGUiLCJhdXRob3JJZCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJpbWFnZSIsImRhdGUiLCJEYXRlIiwibG9jYXRpb24iLCJjYXRlZ29yeSIsImRlbGV0ZU1hbnkiLCJjcmVhdGUiLCJtYXAiLCJuYW1lIiwiREVMRVRFIiwiZGVsZXRlIiwic3VjY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/memories/[id]/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/yallist","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fmemories%2F%5Bid%5D%2Froute&page=%2Fapi%2Fmemories%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmemories%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5CADMIN%5CSide%20Projects%5CSide-Project%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CADMIN%5CSide%20Projects%5CSide-Project&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();