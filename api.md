

<!-- Start libs/suggester.js -->

## StringList

Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>

## Suggester

Creates an instance of Suggester

## add(text, [rank)

Add text to suggest index

### Params:

* **string** *text* Text
* **number** *[rank* = rank + 1] rank - Rank

## remove(text)

Remove text from suggest index

### Params:

* **string** *text* - Text

## search(text, [size=10])

Search suggestion by some text

### Params:

* **string** *text* - Text
* **number** *[size=10]* size - Max size

### Return:

* **Array.\<string>** Array of text

<!-- End libs/suggester.js -->

