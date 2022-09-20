import {pipe} from "fp-ts/function"
import * as O from "fp-ts/lib/Option"

const arr = [10, 4, 25, 2, 3, 6, 8, 11, 31, 7]

const v = pipe(O.some(arr))
