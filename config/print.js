export const print = (e) => {
    console.log(`
*****************************************************

        local port：${e.domain}:${e.port}
        mongodb address：${e.mongo}

*****************************************************
    `);
};