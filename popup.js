class UserTune {
    constructor() {
        this.init();
    }

    init() {
        this.bindUIActions();
        document.getElementById("currentSettingsBtn").click(); // Set the default tab to open
    }

    bindUIActions() {
        document.getElementById('view-live-page-btn').addEventListener('click', this.viewLivePage);
        document.getElementById('currentSettingsBtn').addEventListener('click', (event) => this.openTab(event, 'CurrentSettings'));
        document.getElementById('modifySettingsBtn').addEventListener('click', (event) => this.openTab(event, 'ModifySettings'));
    }

    viewLivePage() {
        chrome.tabs.create({ url: 'https://example.com' }); 
    }

    openTab(evt, tabName) {
        const tabcontent = document.getElementsByClassName("tabcontent");
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        const tablinks = document.getElementsByClassName("tablinks");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }
}

// Instantiate the class when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    new UserTune();
});
