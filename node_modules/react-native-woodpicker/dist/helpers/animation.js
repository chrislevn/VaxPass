import { DEFAULT_BACKDROP_ANIMATION } from "../constants/animation";
export function getAnimatedProperties(backdropAnimation) {
    return Object.assign(Object.assign({}, DEFAULT_BACKDROP_ANIMATION), (backdropAnimation || {}));
}
