#include "point.h"

#include "buffer_offset_index.h"
#include "buffer_offset_index.cc"

#include "nbind/nbind.h"

NBIND_CLASS(Point) {

  construct<>();
  construct<unsigned, unsigned>();

  getset(getRow, setRow);
  getset(getColumn, setColumn);

}

NBIND_CLASS(BufferOffsetIndex) {

  construct<>();

  method(splice);
  method(characterIndexForPosition);
  method(positionForCharacterIndex);

}
