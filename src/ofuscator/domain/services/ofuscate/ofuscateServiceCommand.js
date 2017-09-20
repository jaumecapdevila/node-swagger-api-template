function OfuscateServiceCommand (oldURL) {
    this.oldURL = oldURL;
}

OfuscateServiceCommand.prototype.getOldURL = function getOldURL() {
    return this.oldURL;
}

module.exports = OfuscateServiceCommand;
