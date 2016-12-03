require('segfault-handler').registerHandler()

const assert = require('assert')
const NativeBufferOffsetIndex = require('../src/entry-node');
const AsmjsBufferOffsetIndex = require('../src/entry-browser');
const ReferenceBufferOffsetIndex = require('./reference-buffer-offset-index');

const randomSeed = require('random-seed');
const seed = 42; //randomSeed.create()(Number.MAX_SAFE_INTEGER);

[ {

    name: 'native',
    Implementation: NativeBufferOffsetIndex

}, {

    name: 'asmjs',
    Implementation: AsmjsBufferOffsetIndex

} ].forEach(({ name, Implementation }) => {

    describe('BufferOffsetIndex (' + name + ')', () => {

        it('maps character indices to 2d points and viceversa', function () {

            this.timeout(Infinity);

            for (var iteration = 0; iteration < 100; iteration++) {

                const referenceIndex = new ReferenceBufferOffsetIndex();
                const bufferIndex = new Implementation();

                const random = randomSeed.create(seed);

                for (let i = 0; i < 50; i++) {

                    const startRow = random.intBetween(0, referenceIndex.lineLengths.length);
                    const deletedLinesCount = random.intBetween(0, referenceIndex.getLineCount() - startRow + 1);
                    const newLineLengths = [];

                    for (let j = 0; j < 10; j++)
                        newLineLengths.push(random.intBetween(1, 100));

                    referenceIndex.splice(startRow, deletedLinesCount, newLineLengths);
                    bufferIndex.splice(startRow, deletedLinesCount, newLineLengths);

                    for (var j = 0; j < 100; j++) {

                        const index = random.intBetween(0, referenceIndex.getCharactersCount());

                        const row = random(10) <= 1 ? 0xFFFFFFFF : random.intBetween(0, referenceIndex.getLineCount() + 10);
                        const column = random(10) <= 1 ? 0xFFFFFFFF : random.intBetween(0, referenceIndex.getLongestColumn() + 10);

                        const position = { row, column };

                        const referenceCharacterIndex = referenceIndex.characterIndexForPosition(position);
                        assert.equal(bufferIndex.characterIndexForPosition(position), referenceCharacterIndex);

                        const testedPosition = bufferIndex.positionForCharacterIndex(index);
                        const referencePosition = referenceIndex.positionForCharacterIndex(index);
                        assert.deepEqual([ testedPosition.row, testedPosition.column ], [ referencePosition.row, referencePosition.column ]);

                    }

                }

            }

        });

    });

});
