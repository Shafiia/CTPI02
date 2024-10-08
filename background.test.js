

// Mock Chrome APIs
global.chrome = {
    runtime: {
        onInstalled: {
            addListener: jest.fn(),
        },
        onMessage: {
            addListener: jest.fn(),
        },
        lastError: null
    },
    storage: {
        local: {
            set: jest.fn((data, callback) => callback && callback()),
            get: jest.fn((key, callback) => callback({ settings: {} }))
        }
    },
    tabs: {
        query: jest.fn((queryInfo, callback) => callback([{ id: 1 }])),
        sendMessage: jest.fn(),
        onUpdated: {
            addListener: jest.fn(),
        },
        onCreated: {
            addListener: jest.fn(),
        }
    },
    scripting: {
        executeScript: jest.fn((details, callback) => callback && callback())
    }
};

// Import the background.js functions 
const background = require('./background');

describe('Background script', () => {
    it('should apply settings when extension is installed', () => {
            const spy = jest.spyOn(background, 'applySettingsToAllTabs');
            background.applySettingsToAllTabs();
            expect(spy).toHaveBeenCalled();
    });

    it('should apply settings to all open tabs', () => {
        background.applySettingsToAllTabs();
        expect(chrome.tabs.query).toHaveBeenCalled();
        expect(chrome.scripting.executeScript).toHaveBeenCalled();
    });

    it('should store settings on message reception', () => {
        const message = { action: 'applySettings', settings: { colorBlindness: true } };
        chrome.runtime.onMessage.addListener.mock.calls[0][0](message);
        expect(chrome.storage.local.set).toHaveBeenCalledWith({ settings: message.settings }, expect.any(Function));
    });
});
