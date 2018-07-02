
export const initialState = {
    // Burası sabit kalmalı
    pathsToResetOnRouteChange:[], // Router değiştiğinde store'da temizlenecek item'lar. İsteğe bağlı.
    loading: false, // Loading --> request olduğunda TRUE, Success/Failed olduğunda FALSE olur.
    processBox: [],
    messageBox: [],
    // --------------------------------------------------------->
    treeMenu: {},
    tabMenu: {},
    activeMenu: {}
};

