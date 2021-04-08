type CustomRoute = {
    name: string;
    path: string;
    Component: React.FC;
    canAccess: 'authorized' | 'unauthorized' | 'all';
};