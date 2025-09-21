import { Pose, AspectRatio, QualityOption } from './types';

export const POSES: Pose[] = [
  { name: "Power Stance", prompt: "Model in a confident power stance, feet shoulder-width apart, looking directly at the camera to showcase the outfit's silhouette." },
  { name: "Walking Motion", prompt: "Model captured in a natural walking motion towards the camera, one leg forward, creating a sense of movement." },
  { name: "Editorial Lean", prompt: "Model leaning elegantly against a neutral wall, one leg crossed over the other, creating an S-curve with the body to highlight the drape of the clothing." },
  { name: "Hand on Hip", prompt: "Classic fashion pose with one hand on the hip, creating a strong triangular shape and accentuating the waistline." },
  { name: "Three-Quarter Turn", prompt: "Model in a three-quarter turn, looking over their shoulder towards the camera, showcasing the side and back details of the garment." },
  { name: "Seated Poise", prompt: "Model seated gracefully on a simple block or stool, with elongated posture, knees together, showcasing how the clothing behaves when sitting." },
  { name: "Action Shot", prompt: "A dynamic action shot of the model mid-jump or twirl, capturing the movement and flow of the fabric." },
  { name: "Pocket Detail", prompt: "Model with one hand casually placed in a pocket, drawing attention to the garment's details and creating a relaxed feel." },
  { name: "Looking Down", prompt: "An introspective pose with the model's gaze directed downwards, creating a chic and sophisticated mood." },
  { name: "Contrapposto", prompt: "A classic contrapposto pose where the model's weight is shifted to one leg, creating a natural, relaxed, and flattering S-curve." },
  { name: "Hands on Hips", prompt: "Model standing confidently with both hands placed firmly on the hips, elbows out, creating a powerful and assertive look." },
  { name: "Over Shoulder", prompt: "Model looking back over their shoulder at the camera with a subtle smile, creating a candid and engaging moment." },
  { name: "Playful Jump", prompt: "A joyful, mid-air shot of the model jumping with legs slightly bent and arms open, conveying energy and happiness." },
  { name: "Crossed Arms", prompt: "Model with arms crossed confidently over the chest, exuding a sense of cool, modern attitude. Can be smiling or serious." },
  { name: "Hair in Wind", prompt: "Model's hair is gently blowing in the wind, creating a sense of dynamic, effortless motion and freedom." },
];

export const ASPECT_RATIOS: AspectRatio[] = [
  { name: "Portrait (3:4)", value: "3:4" },
  { name: "Square (1:1)", value: "1:1" },
  { name: "Landscape (4:3)", value: "4:3" },
  { name: "Widescreen (16:9)", value: "16:9" },
];

export const QUALITY_OPTIONS: QualityOption[] = [
    { name: "Standard", value: "standard", description: "Good quality for fast results." },
    // FIX: Corrected typo `name:g` to `name:`.
    { name: "High", value: "high", description: "Higher quality, more detailed image." },
    { name: "Ultra", value: "ultra", description: "Best possible photorealistic quality." },
];