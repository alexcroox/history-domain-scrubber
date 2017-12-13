chrome.options.set("", [
    { type: 'h3', desc: 'Add or remove domains to be automatically deleted from your history' },
    {
        type: 'list',
        name: 'domains',
        desc: 'Add just the domain, don\'t include http, e.g reddit.com',
        head: true,
        sortable: false,
        fields: [
            { type: 'text', name: 'domain', desc: 'Domains' },
        ]
    }
])
