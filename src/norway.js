import { select } from 'd3';
import { geoPath, geoMercator } from 'd3-geo';

import Events from './events';
import counties from './data/counties.json';
import municipalities from './data/municipalities.json';

const prop = (json, property) => json.properties[property];

const County = {};
County.asId = path => prop(path, 'FylkeNr');
County.asName = path => prop(path, 'NAVN');
County.asJson = path => ({ id: County.asId(path), name: County.asName(path) });
County.data = counties;

const Municipality = {};
Municipality.asId = path => prop(path, 'KOMM');
Municipality.asName = path => prop(path, 'NAVN');
Municipality.asJson = path => ({ id: Municipality.asId(path), name: Municipality.asName(path) });
Municipality.data = municipalities;

const mixin = (what, where) => {
  for (var key in what)
    where[key] = what[key];
};

export default class Country {

  static get Counties() { return County; }

  static get Municipalities() { return Municipality; }

  constructor(el, { area = Country.County } = {}) {
    mixin(new Events, this);

    this.area = area;
    this._areas = [];

    const [x, y] = [400, 560];

    const svgEl= select(el)
          .append('svg:svg')
          .attr('viewBox', `0 0 ${x} ${y}`)
          .attr('preserveAspectRatio', 'xMidYMid')
          .attr('width', '100%')
          .attr('height', '100%');

    const projection = geoMercator()
          .scale(1000)
          .translate([-110, 1800]);

    this.path = geoPath(projection);

    this.svg = svgEl
      .append('svg:g')
      .attr('id', 'areas');

    setTimeout(() => this.load(this.area.data));
  }

  load ({ features }) {
    this.addAreas(features);
    this.drawPaths(features);
    this.emit('load');
  }

  addAreas (features) {
    features.forEach(c => this._areas.push(this.area.asJson(c)));
  }

  drawPaths (features) {
    this.createPaths(features)
      .attr('d', this.path)
      .attr('title', this.area.asName)
      .attr('id', c => `area_${this.area.asId(c)}`)
      .on('click', c => this.emit('selected', this.area.asJson(c)));
  }

  createPaths (features) {
    return this.svg.selectAll('path')
      .data(features)
      .enter()
      .append('svg:path');
  }

  addClass (area, classname) {
    const selector = `path#area_${area.id}`;
    this.svg.select(selector).attr('class', classname);
  }

  areas () {
    return this._areas.map(_ => _);
  }
}
