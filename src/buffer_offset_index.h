#ifndef BUFFER_OFFSET_INDEX_H_
#define BUFFER_OFFSET_INDEX_H_

#include <vector>
#include <random>
#include "point.h"

struct LineNode;

class BufferOffsetIndex {
 public:
  BufferOffsetIndex();
  ~BufferOffsetIndex();
  void splice(unsigned, unsigned, std::vector<unsigned>);
  unsigned characterIndexForPosition(Point) const;
  Point positionForCharacterIndex(unsigned) const;

 private:
  LineNode *findAndBubbleNodeUpToRoot(unsigned);
  void bubbleNodeDown(LineNode *, LineNode *);
  void rotateNodeLeft(LineNode *, LineNode *, LineNode *);
  void rotateNodeRight(LineNode *, LineNode *, LineNode *);
  LineNode *buildLineNodeTreeFromLineLengths(std::vector<unsigned> const &, unsigned, unsigned, unsigned);

  LineNode *root;
  std::default_random_engine rng_engine;
};

#endif // BUFFER_OFFSET_INDEX_H_
