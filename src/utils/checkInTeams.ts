const checkInTeams = () => {
    if (
        // @ts-ignore
        (window.parent === window.self && window.nativeInterface) ||
        window.name === 'embedded-page-container' ||
        window.name === 'extension-tab-frame'
    ) {
        return true;
    }
    return false;
};

export default checkInTeams;