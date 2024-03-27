"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5069],{8667:(e,t,n)=>{n.d(t,{i:()=>a});var r=n(7896),o=n(2784),i=n(8873);const a=e=>{let{storyName:t,iframeProps:n}=e;return o.createElement(i.Z,(0,r.Z)({src:`/storybook/iframe.html?id=${t}&args=&viewMode=story`,frameBorder:0,allowtransparency:"true",style:n.width||n.minWidth||n.maxWidth?{}:{width:"1px",minWidth:"100%"}},n??{}))}},306:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>s,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var r=n(7896),o=(n(2784),n(876)),i=n(8667);const a={sidebar_position:3.5},s="Custom Render Hooks",l={unversionedId:"guides/rendering",id:"guides/rendering",title:"Custom Render Hooks",description:"React Complex Tree is completely unopinionated and allows you to customize every single node written to the DOM",source:"@site/docs/guides/rendering.mdx",sourceDirName:"guides",slug:"/guides/rendering",permalink:"/docs/guides/rendering",draft:!1,editUrl:"https://github.com/lukasbach/react-complex-tree/edit/main/packages/docs/docs/guides/rendering.mdx",tags:[],version:"current",sidebarPosition:3.5,frontMatter:{sidebar_position:3.5},sidebar:"tutorialSidebar",previous:{title:"Styling Customizability",permalink:"/docs/guides/styling"},next:{title:"Managing a tree's view state",permalink:"/docs/guides/viewstate"}},d={},c=[{value:"Minimalistic Example for custom render hooks",id:"minimalistic-example-for-custom-render-hooks",level:2},{value:"Complex Example for custom render hooks",id:"complex-example-for-custom-render-hooks",level:2},{value:"Customizing the render logic for tree items",id:"customizing-the-render-logic-for-tree-items",level:2}],m={toc:c};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"custom-render-hooks"},"Custom Render Hooks"),(0,o.kt)("p",null,"React Complex Tree is completely unopinionated and allows you to customize every single node written to the DOM\ntree."),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"React Complex Tree provides default renderers that fulfill\n",(0,o.kt)("a",{parentName:"p",href:"https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-2/treeview-2a.html"},"the accessibility requirements for tree structures as specified by W3C"),".\nThis may no longer hold if you implement your own renderers instead."),(0,o.kt)("p",{parentName:"admonition"},"If you provide custom renderers, make sure to create a DOM structure that fulfills the\naccessibility requirements by W3C.")),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"If you only want to make small adjustments to the styling of the tree like adaptions to spacing, fonts or colors,\nyou can look into the ",(0,o.kt)("a",{parentName:"p",href:"styling"},"styling guide")," to see how you can use custom CSS variables and rules to adapt how\nthe tree rendered by the default render hooks looks like.")),(0,o.kt)("h2",{id:"minimalistic-example-for-custom-render-hooks"},"Minimalistic Example for custom render hooks"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live",live:!0},"function App() {\n  return (\n    <UncontrolledTreeEnvironment\n      canDragAndDrop={true}\n      canDropOnFolder={true}\n      canReorderItems={true}\n      dataProvider={new StaticTreeDataProvider(shortTree.items, (item, data) => ({ ...item, data }))}\n      getItemTitle={item => item.data}\n      viewState={{\n        ['tree-1']: {\n          expandedItems: ['container'],\n        },\n      }}\n      renderItemTitle={({ title }) => <span>{title}</span>}\n      renderItemArrow={({ item, context }) =>\n        item.isFolder ? <span {...context.arrowProps}>{context.isExpanded ? 'v ' : '> '}</span> : null\n      }\n      renderItem={({ title, arrow, depth, context, children }) => (\n        <li\n          {...context.itemContainerWithChildrenProps}\n          style={{\n            margin: 0,\n            display: 'flex',\n            flexDirection: 'column',\n            alignItems: 'flex-start',\n          }}\n        >\n          <button {...context.itemContainerWithoutChildrenProps} {...context.interactiveElementProps}>\n            {arrow}\n            {title}\n          </button>\n          {children}\n        </li>\n      )}\n      renderTreeContainer={({ children, containerProps }) => <div {...containerProps}>{children}</div>}\n      renderItemsContainer={({ children, containerProps }) => <ul {...containerProps}>{children}</ul>}\n    >\n      <Tree treeId=\"tree-1\" rootItem=\"root\" treeLabel=\"Tree Example\" />\n    </UncontrolledTreeEnvironment>\n  );\n}\n")),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"All currently available render hooks are documented in the\n",(0,o.kt)("a",{parentName:"p",href:"/docs/api/interfaces/TreeRenderProps"},"TreeRenderProps interface"),".")),(0,o.kt)("h2",{id:"complex-example-for-custom-render-hooks"},"Complex Example for custom render hooks"),(0,o.kt)("p",null,"As part of the ",(0,o.kt)("inlineCode",{parentName:"p"},"react-complex-tree")," monorepo, we maintain official render logic that generates a tree according\nto the UI framework ",(0,o.kt)("a",{parentName:"p",href:"https://blueprintjs.com/docs/#core/components/tree"},"BlueprintJS")," by Palantir.\nYou can find the code for the custom render implementation\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/lukasbach/react-complex-tree/blob/main/packages/blueprintjs-renderers/src/renderers.tsx"},"here"),"."),(0,o.kt)(i.i,{storyName:"blueprintjs-renderers-blueprintjs-renderers--short-blueprint-js-tree",iframeProps:{width:600},mdxType:"StoryEmbed"}),(0,o.kt)("h2",{id:"customizing-the-render-logic-for-tree-items"},"Customizing the render logic for tree items"),(0,o.kt)("p",null,"The most interesting hook is probably the ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/interfaces/TreeRenderProps#renderitem"},"renderItem")," hook,\nwhich allows you to customize how individual tree items are rendered.\nWhen using this hook to render an item, you can use the provided\n",(0,o.kt)("a",{parentName:"p",href:"/docs/api/interfaces/TreeItemRenderContext"},"TreeItemRenderContext")," to access the render details of the item\n(e.g. whether the user currently drags over this item, or whether it is selected), and directly alter the\ntree state (i.e. ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/interfaces/TreeItemRenderContext#addtoselecteditems"},(0,o.kt)("inlineCode",{parentName:"a"},"context.addtoselecteditems()")),")."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"props.children")," prop contains the child nodes of the tree item. You need to render this so that children\nare displayed. In the above example, children are rendered as child nodes for the item node itself, according\nto W3C accessibility specifications. If you want to render a linear list of items, independent of item depth,\nfor example because you want to implement a virtualized list, you can do so by rendering the children outside the\nitem container:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"renderItem={({ title, arrow, depth, context, children }) => (\n  <>\n    <li\n      {...context.itemContainerWithChildrenProps}\n    >\n      <button\n        {...context.itemContainerWithoutChildrenProps}\n        {...context.interactiveElementProps}\n      >\n        { arrow }\n        { title }\n      </button>\n    </li>\n    {children}\n  </>\n)}\n")),(0,o.kt)("p",null,"Make sure to provide the props-objects ",(0,o.kt)("inlineCode",{parentName:"p"},"context.itemContainerWithoutChildrenProps")," and\n",(0,o.kt)("inlineCode",{parentName:"p"},"context.itemContainerWithChildrenProps")," to the respective elements in your DOM structure, the first to the node\nthat contains the item and its children, and the second to the node that only contains the item without\nits children. This is necessary to compute sizing information during drags."),(0,o.kt)("p",null,"Furthermore, the ",(0,o.kt)("inlineCode",{parentName:"p"},"context.interactiveElementProps")," props can be spread to the interactive element to\nimplement default interaction handlers, so that clicking on an element invokes its primary actions,\nit is selected and focused etc. Those props implement the most common DOM interaction hooks and attach them\nto the tree state, meaning that you need to provide minimal implementation effort for custom renderers. You\ncan omit those props if you want to implement custom interaction logic."),(0,o.kt)("p",null,"Note that, if you want to customize the way how mouse clicks interact with the tree state (i.e. whether\nclicking on a parent node should expand it or just focus it) should not be changed by providing custom\nDOM hooks, but by choosing a different interaction mode.\n",(0,o.kt)("a",{parentName:"p",href:"/docs/guides/interaction-modes"},"Read more on interaction modes here"),"."))}p.isMDXComponent=!0},876:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>u});var r=n(2784);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),d=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=d(e.components);return r.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=d(n),u=o,h=p["".concat(l,".").concat(u)]||p[u]||m[u]||i;return n?r.createElement(h,a(a({ref:t},c),{},{components:n})):r.createElement(h,a({ref:t},c))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var d=2;d<i;d++)a[d]=n[d];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);