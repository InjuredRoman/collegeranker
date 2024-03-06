import useAuthStore from "../store/auth/auth.store";
import { NavLinkItem } from "./interfaces";
import { sizes } from "./breakpoints";
import { AccountBox, CompareArrows, HomeOutlined, LogoutOutlined, SchoolOutlined, SearchOutlined, TimelineOutlined } from "@mui/icons-material";

export const publicItems: NavLinkItem[] = [
    {
        text: 'Colleges',
        items: [],
        url: '/colleges',
        isActive: false,
    },
    {
        text: 'Coaching',
        isActive: false,
        items: [
            { text: 'Test Prep', url: '/test-prep', items: [], isActive: false },
            { text: 'Essays', url: '/essays', items: [], isActive: false },
            { text: 'ADHD', url: '/adhd', items: [], isActive: false },
        ],
        url: '/coaching'
    },
    { text: 'Articles', items: [], url: '/articles', isActive: false },
    { text: 'About Us', items: [], url: '/about-us', isActive: false },
    { text: 'Login', items: [], url: '/login', isActive: false }
];

export const authItems: NavLinkItem[] = [
    {
        text: 'Home',
        items: [],
        url: '/home',
        isActive: false,
        icon: HomeOutlined
    },
    {
        text: 'Colleges',
        items: [
            {
                text: 'Compare Collge',
                items: [],
                url: '/colleges/compare',
                isActive: false,
                icon: CompareArrows
            },
            {
                text: 'Search Collge',
                items: [],
                url: '/colleges/search',
                isActive: false,
                icon: SearchOutlined
            },
        ],
        url: '/colleges',
        isActive: false,
        icon: SchoolOutlined
    },
    {
        text: 'My Timeline',
        items: [],
        url: '/timeline',
        isActive: false,
        icon: TimelineOutlined
    },
    {
        text: 'Profile',
        items: [],
        showWhen: sizes.tablet,
        url: '/profile',
        isActive: false,
        icon: AccountBox

    },
    {
        text: 'Logout',
        items: [], url: '/login',
        showWhen: sizes.tablet,
        handler: () => {
            useAuthStore.getState().logout();
        },
        isActive: false,
        icon: LogoutOutlined
    }

]