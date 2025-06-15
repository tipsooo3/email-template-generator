document.getElementById('template-form').addEventListener('submit', function(e) {
    e.preventDefault();
    generateTemplate();
});

document.getElementById('copy-code').addEventListener('click', function() {
    const preview = document.getElementById('template-preview');
    const range = document.createRange();
    range.selectNode(preview);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    
    alert('Template code copied to clipboard!');
});

document.getElementById('download-html').addEventListener('click', function() {
    const preview = document.getElementById('template-preview').innerHTML;
    const blob = new Blob([preview], {type: 'text/html'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

function generateTemplate() {
    const templateType = document.getElementById('template-type').value;
    const colorScheme = document.getElementById('color-scheme').value;
    const companyName = document.getElementById('company-name').value || 'Your Company';
    const logoUrl = document.getElementById('logo-url').value;
    
    let template = '';
    
    // Header
    template += `<div class="email-header" style="background-color: ${colorScheme}; color: white; padding: 20px; text-align: center;">
                    ${logoUrl ? `<img src="${logoUrl}" alt="${companyName}" style="max-height: 80px; margin-bottom: 15px;">` : ''}
                    <h1>${companyName}</h1>
                </div>`;
    
    // Body based on template type
    switch(templateType) {
        case 'newsletter':
            template += newsletterTemplate(colorScheme, companyName);
            break;
        case 'promotional':
            template += promotionalTemplate(colorScheme, companyName);
            break;
        case 'transactional':
            template += transactionalTemplate(colorScheme, companyName);
            break;
        case 'invitation':
            template += invitationTemplate(colorScheme, companyName);
            break;
    }
    
    // Footer
    template += `<div class="email-footer" style="background-color: #f1f1f1; padding: 20px; text-align: center; font-size: 0.9em; color: #666;">
                    <p>© ${new Date().getFullYear()} ${companyName}. All rights reserved.</p>
                    <p><a href="#" style="color: ${colorScheme};">Unsubscribe</a> | <a href="#" style="color: ${colorScheme};">Privacy Policy</a></p>
                </div>`;
    
    document.getElementById('template-preview').innerHTML = template;
}

function newsletterTemplate(color, company) {
    return `
    <div class="email-body" style="padding: 20px;">
        <h2 style="color: ${color};">Monthly Newsletter</h2>
        <p>Hello Subscriber,</p>
        <p>Here's what's new this month at ${company}:</p>
        
        <div style="margin: 20px 0; border-top: 1px solid #eee; padding-top: 20px;">
            <h3 style="color: ${color};">Featured Story</h3>
            <img src="https://via.placeholder.com/600x300" alt="Featured" style="width: 100%; margin: 10px 0;">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
            <a href="#" class="cta-button" style="display: inline-block; padding: 10px 20px; background-color: ${color}; color: white; text-decoration: none; border-radius: 4px; margin: 10px 0;">Read More</a>
        </div>
        
        <div style="display: flex; flex-wrap: wrap; gap: 20px; margin: 20px 0;">
            <div style="flex: 1; min-width: 200px;">
                <h4 style="color: ${color};">Update 1</h4>
                <p>Vivamus luctus eros aliquet convallis ultricies.</p>
            </div>
            <div style="flex: 1; min-width: 200px;">
                <h4 style="color: ${color};">Update 2</h4>
                <p>Mauris augue massa, ultricies non ligula.</p>
            </div>
        </div>
    </div>
    `;
}

// Similar functions for promotionalTemplate, transactionalTemplate, and invitationTemplate
// ... (you can expand these based on your needs)
