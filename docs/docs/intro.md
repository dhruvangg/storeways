---
sidebar_position: 1
---

# Storeways

Storeways is a Javascript plugin which uses leaflet JS and OpenStreetMap to create Store Locator. By Using this plugin, It would be much easier to implement store locators. There are different options available to modify it as per requirement.

## Getting Started

### What you'll require

- [leaflet.js](https://leafletjs.com/) version 1.9.4 or above to render map
- [Handlebars JS](https://handlebarsjs.com/) for templating list and popup structure.

## Options

It is much easier to maintain the current list of options on GitHub vs. a gigantic HTML table, which is why I’m now including the options.md file in the repository.

## Usage

Assuming you already have your data set up in the current file and the basic HTML copied from the example index file, the following would be the simplest usage example:

1. Include the leaflet files:

    Add css file in head of your web page.
    ```
    <link rel="stylesheet" href="leaflet/leaflet.css">
    ```
    Add JS file before closing of body tag.
    ```
    <script src="leaflet/leaflet.js"></script>
    ```

2. Include Handlebars JS to make template for marker popup and List of stores

    ```
    <script src="handlebars.min.js"></script>
    ```

3. Include the plugin file

    ```
    <script src="storeways.js"></script>
    ```

4. Add Template code for popup and list

    **You can customize this code as per your requirement, just make sure that whatevet variable you're using are available in you data.**

    Following script is a template of store list of store locator.

    ```
    <script id="SWList" type="text/x-handlebars-template">
        <div class="list-content">
            <div class="loc-name">{{name}}</div>
            <div class="loc-addr">{{address}}</div>
            {{#if address2}}
                <div class="loc-addr2">{{address2}}</div>
            {{/if}}
            <div class="loc-addr3">{{city}}{{#if city}},{{/if}} {{state}} {{postal}}</div>
            {{#if phone}}
                <div class="loc-phone">{{phone}}</div>
            {{/if}}
            {{#if web}}
                <div class="loc-web"><a href="{{web}}" target="_blank">{{web}}</a></div>
            {{/if}}
            {{#if distance}}
                <div class="loc-dist loc-default-dist">{{distance}} {{length}}</div>
                {{#if altdistance}}<div class="loc-dist loc-alt-dist">{{altdistance}} {{altlength}}</div>{{/if}}
                <div class="loc-directions"><a href="https://maps.google.com/maps?saddr={{origin}}&amp;daddr={{address}} {{address2}} {{city}}, {{state}} {{postal}}" target="_blank">Directions</a></div>
            {{/if}}
        </div>
    </script>
    ```

    Following script is a template of map marker popup.

    ```
    <script id="SWPopup" type="text/x-handlebars-template">
        <div class="loc-name">{{name}}</div>
        <div>{{address}}</div>
        {{#if address2}}
            <div>{{address2}}</div>
        {{/if}}
        <div>{{city}}{{#if city}},{{/if}} {{state}} {{postal}}</div>
        {{#if hours1}}
            <div>{{hours1}}</div>
        {{/if}}
        {{#if hours2}}
            <div>{{hours2}}</div>
        {{/if}}
        {{#if hours3}}
            <div>{{hours3}}</div>
        {{/if}}
        {{#if phone}}
            <div>{{phone}}</div>
        {{/if}}
        <div><a href="{{web}}" target="_blank">{{web}}</a></div>
    </script>
    ```
    
5. Apply the storeways plugin

    ```
    const storeways = new StoreWays({
        storeData: data,
        mapID: 'map',
        listTemplate: 'SWList',
        popupTemplate: 'SWPopup',
        defaultLoc: true,
        defaultlat: 23.0053315,
        defaultlng: 72.6156623
    });
    ```    

## Support

I'll try to answer basic questions and create more examples but my time is limited.    

## Files

Files can be downloaded from [GitHub](https://github.com/dhruvangg/storeways) and will be in the /dist directory

## Special thanks
My initial motivation for creating this plugin was a custom implementation request store locator for multiple projects at work-place. [Bjorn's jquery Store locator plugin](https://www.bjornblog.com/web/jquery-store-locator-plugin) is the biggest inspiration to make this plugin. 