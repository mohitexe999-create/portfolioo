export interface ProjectMetricSeries {
  label: string;
  before: number;
  after: number;
}

export interface ProjectMetrics {
  title: string;
  note: string;
  summary: string;
  series: ProjectMetricSeries[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectGalleryItem {
  src: string;
  alt: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  type: string;
  description: string;
  purpose: string;
  image: string;
  imageAlt?: string;
  href: string;
  links: ProjectLink[];
  metrics?: ProjectMetrics;
  tools: string[];
  accent: string;
  ratio: string;
  stamp: string;
  gallery?: ProjectGalleryItem[];
}

export const PROJECTS: Project[] = [
  {
    "id": "01",
    "name": "VERSE",
    "type": "Gemma fine-tune",
    "description": "Built for the Gemma Margadarshan Hackathon, VERSE V2 fine-tunes Gemma 4 E4B with one LoRA / PEFT adapter for English, Nepali and Maithili speech. The model handles three transcription tasks and six translation directions from a single instruction-led network.",
    "purpose": "Audio goes into Gemma and captions come out without Whisper, a cloud speech API or a separate ASR model. Training used 66,814 cleaned source clips expanded into 200,442 task examples, with 18.35 million trainable parameters, then ran across Colab A100 experiments and a final RunPod B200 session.",
    "image": "/projects/verse-gemma-art.webp",
    "imageAlt": "Original post-impressionist painting of a Himalayan night garden",
    "href": "https://huggingface.co/Aashishhhhhhhh/verse-v2-nepali-maithili",
    "links": [
      {
        "label": "OPEN THE HUGGING FACE ADAPTER",
        "href": "https://huggingface.co/Aashishhhhhhhh/verse-v2-nepali-maithili"
      }
    ],
    "metrics": {
      "title": "Matched evaluation",
      "note": "Original Gemma versus the fine-tuned VERSE adapter. Lower is better.",
      "summary": "54.9% relative WER reduction / 67.3% relative CER reduction",
      "series": [
        {
          "label": "WER",
          "before": 41.96,
          "after": 18.92
        },
        {
          "label": "CER",
          "before": 12.48,
          "after": 4.08
        }
      ]
    },
    "tools": [
      "Gemma 4 E4B",
      "LoRA / PEFT",
      "Unsloth",
      "Speech AI"
    ],
    "accent": "#c9c5bc",
    "ratio": "8 / 5",
    "stamp": "SPEECH / MODEL"
  },
  {
    "id": "02",
    "name": "Nepal SEIR / RK4",
    "type": "Epidemic systems model",
    "description": "A two-wave Nepal COVID-19 simulation that advances the SEIR equations with the fourth-order Runge–Kutta method and fits ten time-varying transmission-rate segments to each wave.",
    "purpose": "Built from Johns Hopkins confirmed, recovered and death data, the model reaches 0.573% and 0.143% MAPE across the two waves, then tests how 25%, 50% and 75% reductions in beta change cumulative cases. An interactive teaching simulator also exposes the equations and each RK4 step.",
    "image": "/projects/seir-abstract-painting.webp",
    "imageAlt": "Original abstract impasto painting in dusty lilac, apricot, blue, ochre and jade",
    "href": "https://github.com/AashishThakuri/Covid-19-SEIR-Model",
    "links": [
      {
        "label": "VIEW THE GITHUB REPOSITORY",
        "href": "https://github.com/AashishThakuri/Covid-19-SEIR-Model"
      }
    ],
    "graph": {
      "src": "/projects/seir-beta-reduction.png",
      "alt": "Two-wave Nepal COVID-19 SEIR chart comparing the fitted transmission rate with 25, 50 and 75 percent reductions",
      "title": "BETA-REDUCTION SCENARIOS",
      "note": "Ten fitted beta segments compared with 25%, 50% and 75% reductions across both Nepal waves."
    },
    "tools": [
      "Python",
      "RK4",
      "SEIR",
      "Pandas",
      "NumPy",
      "SciPy"
    ],
    "accent": "#c9c5bc",
    "ratio": "8 / 5",
    "stamp": "MODELING / DATA"
  }
];
