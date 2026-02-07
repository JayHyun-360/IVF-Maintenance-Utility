module.exports=[93931,a=>{"use strict";var b=a.i(87924),c=a.i(20628);function d({children:a,onClick:d,type:e="button",variant:f="primary",size:g="md",disabled:h=!1,loading:i=!1,className:j="",fullWidth:k=!1,hapticFeedback:l=!0,onTouchStart:m,onTouchEnd:n}){let{themeConfig:o}=(0,c.useTheme)(),p=()=>{l&&"vibrate"in navigator&&navigator.vibrate(10)},q=(()=>{switch(f){case"primary":default:return{background:`linear-gradient(135deg, ${o.colors.primary} 0%, ${o.colors.secondary} 100%)`,color:"#FFFFFF",border:`1px solid ${o.colors.primary}`,boxShadow:`0 4px 14px 0 ${o.colors.primary}25`};case"secondary":return{backgroundColor:o.colors.surface,color:o.colors.text,border:`1px solid ${o.colors.border}`};case"danger":return{background:`linear-gradient(135deg, ${o.colors.error} 0%, ${o.colors.error} 100%)`,color:"#FFFFFF",border:`1px solid ${o.colors.error}`,boxShadow:`0 4px 14px 0 ${o.colors.error}25`};case"ghost":return{backgroundColor:"transparent",color:o.colors.text,border:`1px solid ${o.colors.border}`}}})();return(0,b.jsx)("button",{type:e,onClick:()=>{p(),d?.()},onTouchStart:()=>{p(),m?.()},onTouchEnd:n,disabled:h||i,className:`
        ${(()=>{switch(g){case"sm":return"px-3 py-2 text-xs sm:text-sm";case"md":default:return"px-4 py-3 text-sm sm:text-base";case"lg":return"px-6 py-4 text-base sm:text-lg";case"mobile":return"px-4 py-4 text-base min-h-[44px] min-w-[44px]"}})()}
        ${k?"w-full":""}
        rounded-xl font-medium transition-all duration-300 
        hover:scale-105 hover:shadow-xl active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:scale-100 disabled:hover:shadow-lg
        ${l?"haptic-feedback":""}
        touch-manipulation
        ${j}
      `,style:q,children:i?(0,b.jsxs)("div",{className:"flex items-center justify-center space-x-2",children:[(0,b.jsx)("div",{className:"w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"}),(0,b.jsx)("span",{children:"Loading..."})]}):a})}a.s(["default",()=>d])}];

//# sourceMappingURL=apps_web_src_components_Button_tsx_eb952d1a._.js.map