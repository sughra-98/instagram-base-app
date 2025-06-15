import { library } from '@fortawesome/fontawesome-svg-core';

import { faHome,faUser, faEnvelope,faComment,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
library.add(faHome,faUser,faEnvelope,faComment,faRightFromBracket);



export const SidebarData = [
{
    title:"Home",
    icon: "home",
    link:"/"
    
},

{
    title:"Create post",
    icon: "envelope",
    link:"/createpost"
    
},

{
    title:"Chat",
    icon: "comment",
    link:"/chat"
    
},
{
    title:"Profile",
    icon: "user",
    link:"/profile"
    
},
{
    title:"Logout",
    icon: "right-from-bracket",
    link:"/"
    
}
]