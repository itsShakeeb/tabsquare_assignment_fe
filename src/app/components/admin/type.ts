export interface NavItem {
    name: string;
    icon: React.ReactNode;
    path: string;
    badge?: string;
}

export interface NavSection {
    title?: string;
    items: NavItem[];
}