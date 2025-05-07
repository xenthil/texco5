module.exports.email = function (to, cc, subject, text, html) {
    this.to = to;
    this.cc = cc;
    this.subject = subject;
    this.text = text;
    this.html = html;
}

module.exports.emailattach = function (to, cc, subject, text, html,attachments) {
    this.to = to;
    this.cc = cc;
    this.subject = subject;
    this.text = text;
    this.html = html;
    this.attachments = attachments;
}

