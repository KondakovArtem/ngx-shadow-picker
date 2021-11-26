const path = require('path');

module.exports = {
    stories: ['../projects/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/preset-scss', '@storybook/addon-links', '@storybook/addon-essentials'],
    core: {
        builder: 'webpack5',
    },
};
