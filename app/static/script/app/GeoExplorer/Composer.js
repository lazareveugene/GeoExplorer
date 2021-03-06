/**
 * Copyright (c) 2009-2010 The Open Planning Project
 *
 * @requires GeoExplorer.js
 */

/**
 * api: (define)
 * module = GeoExplorer
 * class = GeoExplorer.Composer(config)
 * extends = GeoExplorer
 */

/** api: constructor
 *  .. class:: GeoExplorer.Composer(config)
 *
 *      Create a GeoExplorer application intended for full-screen display.
 */
GeoExplorer.Composer = Ext.extend(GeoExplorer, {

    // Begin i18n.
    publishMapText: "Publish Map",
    saveMapText: "Save Map",
    // End i18n.

    constructor: function(config) {
        
        config.tools = [
            {
                ptype: "gxp_layertree",
                outputConfig: {
                    id: "layertree",
                    tbar: []
                },
                outputTarget: "tree"
            }, {
                ptype: "gxp_legend",
                outputTarget: 'legend'
            }, {
                ptype: "gxp_addlayers",
                actionTarget: "layertree.tbar"
            }, {
                ptype: "gxp_removelayer",
                actionTarget: ["layertree.tbar", "layertree.contextMenu"]
            }, {
                ptype: "gxp_layerproperties",
                actionTarget: ["layertree.tbar", "layertree.contextMenu"]
            }, {
                ptype: "gxp_zoomtolayerextent",
                actionTarget: {target: "layertree.contextMenu", index: 0}
            }, {
                ptype: "gxp_navigation", toggleGroup: this.toggleGroup,
                actionTarget: {target: "paneltbar", index: 6}
            }, {
                ptype: "gxp_wmsgetfeatureinfo", toggleGroup: this.toggleGroup,
                actionTarget: {target: "paneltbar", index: 7}
            }, {
                ptype: "gxp_measure", toggleGroup: this.toggleGroup,
                actionTarget: {target: "paneltbar", index: 8}
            }, {
                ptype: "gxp_zoom",
                actionTarget: {target: "paneltbar", index: 9}
            }, {
                ptype: "gxp_navigationhistory",
                actionTarget: {target: "paneltbar", index: 11}
            }, {
                ptype: "gxp_zoomtoextent",
                actionTarget: {target: "paneltbar", index: 13}
            }
        ];
        
        GeoExplorer.Composer.superclass.constructor.apply(this, arguments);
    }, 
    

    /**
     * api: method[createTools]
     * Create the toolbar configuration for the main view.
     */
    createTools: function() {
        var tools = GeoExplorer.Composer.superclass.createTools.apply(this, arguments);

        var aboutButton = new Ext.Button({
            text: this.appInfoText,
            iconCls: "icon-geoexplorer",
            handler: this.displayAppInfo,
            scope: this
        });

        tools.unshift("-");
        tools.unshift(new Ext.Button({
            tooltip: this.publishMapText,
            handler: function() {
                this.save(this.showEmbedWindow);
            },
            scope: this,
            iconCls: 'icon-export'
        }));
        tools.unshift(new Ext.Button({
            tooltip: this.saveMapText,
            handler: function() {
                this.save(this.showUrl);
            },
            scope: this,
            iconCls: "icon-save"
        }));
        tools.unshift("-");
        tools.unshift(aboutButton);
        return tools;
    },

    /** private: method[showEmbedWindow]
     */
    showEmbedWindow: function() {

       new Ext.Window({
            title: "Export Map",
            layout: "fit",
            width: 380,
            autoHeight: true,
            items: [{
                xtype: "gxp_embedmapdialog",
                url: "viewer.html" + "#maps/" + this.id
            }]
        }).show();
    }

});
