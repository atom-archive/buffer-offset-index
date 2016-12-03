module.exports = function (module, bind, lib) {

    function ensurePoint(point) {

        if (Array.isArray(point))
            return new lib.Point(point[0], point[1]);

        if (point && typeof point === 'object' && !(point instanceof lib.Point))
            return new lib.Point(point.row, point.column);

        return point;

    }

    function override(target, name, fn) {

        let original = target[name];

        Object.defineProperty(target, name, { value: function () {

            var args = [ original ];

            for (var t = 0, T = arguments.length; t < T; ++t)
                args.push(arguments[t]);

            return fn.apply(this, args);

        }, enumerable: false });

    }

    override(lib.BufferOffsetIndex.prototype, 'characterIndexForPosition', function (original, position) {
        return original.call(this, ensurePoint(position));
    });

    bind('Point', function (row, column) {
        this.row = row; this.column = column;
    });

    lib.Point.prototype.fromJS = function (output) {
        output(this.row, this.column);
    };

    module.exports = lib.BufferOffsetIndex;
    module.exports.Point = lib.Point;

};
