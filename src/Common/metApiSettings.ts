const settings = {
    dev: {
        baseMetUrl: "https://api.met.gov.my/v2.1/",
    },
    prod: {
        baseMetUrl: "https://api.met.gov.my/v2.1/",
    },
};

export const getCurrentMetApiSettings = () => {
    if (process.env.NODE_ENV === 'development') return settings.dev;
    return settings.prod;
};

