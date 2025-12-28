Scripting API

# Mat2D

Represents a 2D transformation matrix with components for scaling,
rotation, shear, and translation.

## [​](#fields) Fields

### [​](#xx) `xx`

Represents a 2D transformation matrix with components for scaling,
rotation, shear, and translation.
The xx component of the matrix.

### [​](#xy) `xy`

The xy component of the matrix.

### [​](#yx) `yx`

The yx component of the matrix.

### [​](#yy) `yy`

The yy component of the matrix.

### [​](#tx) `tx`

Translation along the x-axis.

### [​](#ty) `ty`

Translation along the y-axis.

### [​](#withtranslation) `withTranslation`

Creates a translation matrix from the given x and y values or from a
[Vector](/docs/scripting/api-reference/vector) position.

### [​](#withscale) `withScale`

Creates a scale matrix from the given x and y values or from a [Vector](/docs/scripting/api-reference/vector).

### [​](#withscaleandtranslation) `withScaleAndTranslation`

Creates a scale-and-translation matrix from numeric values or vectors.

## [​](#constructors) Constructors

### [​](#values) `values`

Creates a matrix using the specified components.

### [​](#identity) `identity`

Returns the identity matrix.

### [​](#withrotation) `withRotation`

Creates a rotation matrix from the given angle in radians.

## [​](#methods) Methods

### [​](#invert) `invert`

Provides indexed access to the matrix components.
Returns the inverse of the matrix, or nil if the matrix is not invertible.

### [​](#isidentity) `isIdentity`

Returns true if the matrix is the identity transform.

### [​](#eq) `__eq`

Returns true if all components of the two matrices are equal.

### [​](#mul) `__mul`

Transforms the given vector by the matrix and returns the result.

### [​](#mul-2) `__mul`

Returns the matrix product of this matrix and the given matrix

[Listener](/docs/scripting/api-reference/listener)[Node](/docs/scripting/api-reference/node)