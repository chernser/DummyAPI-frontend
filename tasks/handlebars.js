/**
 * Task: handlebars
 * Description: Compile handlebars templates
 * Dependencies: handlebars
 * Modified by: Luis Rei, me@luisrei.com @lmrei, July 2012
 * Contributor (original): @tbranyen
 */

module.exports = function(grunt) {
    grunt.registerMultiTask("handlebars_1", "Compile handlebars templates", function() {
        //var options = grunt.helper("options", this);
        var data = this.data;

        Object.keys(data.files).forEach(function(dest) {
            var src = data.files[dest];
            var srcFiles = grunt.file.expandFiles(src);

            dest = grunt.template.process(dest);

            var handlebarOutput = [];
            var handlebarNamespace = "Handlebars.templates";

            handlebarOutput.push(handlebarNamespace + " = " + handlebarNamespace + " || {};");

            srcFiles.forEach(function(srcFile) {
                var handlebarSource = grunt.file.read(srcFile);
                var filename = srcFile.replace(/^.*[\\\/]/, '').split('.')[0];

                handlebarOutput.push(grunt.helper("handlebars", handlebarSource, filename, handlebarNamespace));
            });

            if (handlebarOutput.length > 0) {
                grunt.file.write(dest, handlebarOutput.join("\n\n"));
                grunt.log.writeln("File '" + dest + "' created.");
            }
        });
    });

    grunt.registerHelper("handlebars", function(source, filename, namespace) {
        try {
            var output = "Handlebars.template("+require("handlebars").precompile(source)+");";
            return namespace + "['" + filename + "'] = " + output;
        } catch (e) {
            grunt.log.error(e);
            grunt.fail.warn("Handlebars failed to compile.");
        }
    });
};
