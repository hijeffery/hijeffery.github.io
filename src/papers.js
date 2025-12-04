// papers.js
// 这里的 visibleCount 控制默认显示多少篇论文（这里设为 2025 和 2024 年的大约 10 篇）
const VISIBLE_COUNT = 10; 

const papersData = [
  {
    title: "River Ice Fine-grained Segmentation: A GF-2 Satellite Image Dataset and Deep Learning Benchmark",
    authors: "Chenxu Wei, Haoxuan Li, Liang Chen, Haohao Zhou, Omirzhan Taukebayev, Wencong Wu, Amirkhan Temirbayev, Lin Han, <strong>Lingyan Ran</strong>, etc.",
    venue: "⑦ <em>IEEE Transactions on Geoscience and Remote Sensing</em>, vol. 63, pp. 1-15, 2025, Art no. 5615814, DOI: 10.1109/TGRS.2025.3604644.",
    image: "Papers/25-GF2dataset/main.png",
    website: "https://ieeexplore.ieee.org/abstract/document/11145880",
    links: [
      { name: "pdf", url: "Papers/25-GF2dataset/main.pdf" }
    ]
  },
  {
    title: "Multi-level Collaborative Distillation Meets Global Workspace Model: A Unified Framework for OCIL",
    authors: "Shibin Su, Guoqiang Liang, De Cheng, Shizhou Zhang, <strong>Lingyan Ran</strong>, Yanning Zhang.",
    venue: "arxiv",
    image: "Papers/25-OCIL/main.png",
    website: "https://arxiv.org/abs/2508.08677",
    links: [
      { name: "pdf", url: "Papers/25-OCIL/paper.pdf" }
    ]
  },
  {
    title: "Flow-CDNet: A Novel Network for Detecting Both Slow and Fast Changes in Bitemporal Images",
    authors: "Haoxuan Li, Chenxu Wei, Haodong Wang, Xiaomeng Hu, Boyuan An, <strong>Lingyan Ran</strong>, etc.",
    venue: "arxiv",
    image: "Papers/25-flowcdnet/main.png",
    website: "https://arxiv.org/abs/2507.02307",
    links: [
      { name: "pdf", url: "Papers/25-flowcdnet/main.pdf" }
    ]
  },
  {
    title: "Adaptive Spatial Augmentation for Semi-supervised Semantic Segmentation",
    authors: "<strong>Lingyan Ran</strong>, Yali Li, Tao Zhuo, Shizhou Zhang, Yanning Zhang.",
    venue: "arxiv",
    image: "Papers/25-asaug/fig1.png",
    website: "https://arxiv.org/abs/2505.23438",
    links: [
      { name: "pdf", url: "Papers/25-asaug/asaug.pdf" }
    ]
  },
  {
    title: "Pseudo Labeling Methods for Semi-Supervised Semantic Segmentation: A Review and Future Perspectives",
    authors: "<strong>Lingyan Ran</strong>, Yali Li, Guoqiang Liang, Yanning Zhang.",
    venue: "① <em>IEEE Transactions on Circuits and Systems for Video Technology</em>, 2025, 35(4): 3054–3080.",
    image: "Papers/24-survey/fig1.png",
    website: "https://ieeexplore.ieee.org/document/10771804",
    links: [
      { name: "pdf", url: "Papers/24-survey/PL.pdf" }
    ]
  },
  {
    title: "DiffV2IR: Visible-to-Infrared Diffusion Model via Vision-Language Understanding",
    authors: "<strong>Lingyan Ran</strong>, Lidong Wang, Guangcong Wang, Peng Wang, Yanning Zhang.",
    venue: "<em>arxiv</em>, 2025",
    image: "Papers/25-diffv2ir/00245.gif",
    website: "https://arxiv.org/abs/2503.19012",
    links: [
      { name: "Project Page", url: "https://diffv2ir.github.io/" },
      { name: "Paper", url: "Papers/25-diffv2ir/diffv2ir.pdf" },
      { name: "Code", url: "https://github.com/LidongWang-26/DiffV2IR" },
      { name: "Demo", url: "https://www.youtube.com/watch?v=YbUuvjnfejE&feature=youtu.be" }
    ]
  },
  {
    title: "AdaSemiCD: An Adaptive Semi-Supervised Change Detection Method Based on Pseudo-Label Evaluation",
    authors: "<strong>Lingyan Ran</strong>, Dongcheng Wen, Tao Zhuo, Shizhou Zhang, Xiuwei Zhang, Yanning Zhang.",
    venue: "⑥ <em>IEEE Transactions on Geoscience and Remote Sensing</em>, vol. 63, pp. 1-14, 2025, Art no. 5615814, doi: 10.1109/TGRS.2025.3551504.",
    image: "Papers/25-adasemiCD/1.png",
    website: "https://ieeexplore.ieee.org/document/10926534",
    links: [
      { name: "pdf", url: "Papers/25-adasemiCD/1.pdf" }
    ]
  },
  {
    title: "Frequency-guided spatial adaptation for camouflaged object detection",
    authors: "Shizhou Zhang, Dexuan Kong, Yinghui Xing, Yue Lu, <strong>Lingyan Ran</strong>, Guoqiang Liang, Hexu Wang, Yanning Zhang.",
    venue: "① <em>IEEE Transactions on Multimedia</em>, 2025, 27: 72-83.",
    image: "Papers/25-COD/cod.png",
    website: "https://ieeexplore.ieee.org/document/10844993",
    links: [
      { name: "pdf", url: "Papers/25-COD/cod.pdf" }
    ]
  },
  {
    title: "Neural rendering of underwater scenes under flat refractive geometry",
    authors: "Ting Bai, Xiaoqiang Zhang, Caiyu Xiong, Zhixin Zhang, <strong>Lingyan Ran</strong>, Hongyu Chu, Hu Deng.",
    venue: "15th International Conference on Information Optics and Photonics (CIOP2024), 2024, Xi’an, China",
    image: "Papers/24-rendering/1.png",
    website: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13418/3048562/Neural-rendering-of-underwater-scenes-under-flat-refractive-geometry/10.1117/12.3048562.short",
    links: [
      { name: "pdf", url: "Papers/24-rendering/1.pdf" }
    ]
  },
  {
    title: "DDF: A Novel Dual-Domain Image Fusion Strategy for Remote Sensing Image Semantic Segmentation with Unsupervised Domain Adaptation",
    authors: "<strong>Lingyan Ran</strong>, Lushuang Wang, Tao Zhuo, Yinghui Xing, Yanning Zhang.",
    venue: "⑤ IEEE Transactions on Geoscience and Remote Sensing, 2024.",
    image: "Papers/24-DDF/2.png",
    website: "https://ieeexplore.ieee.org/document/10620432",
    links: [
      { name: "pdf", url: "Papers/24-DDF/DDF.pdf" }
    ]
  },
  {
    title: "Cross-Platform Video Person ReID: A New Benchmark Dataset and Adaptation Approach",
    authors: "Shizhou Zhang, Wenlong Luo, De Cheng, Qingchun Yang, <strong>Lingyan Ran</strong>, Yinghui Xing, Yanning Zhang.",
    venue: "② ECCV, 2024.",
    image: "Papers/24-reid/reid.png",
    website: "",
    links: [
      { name: "pdf", url: "Papers/24-reid/eccv24.pdf" }
    ]
  },
  {
    title: "Remote Sensing Image Semantic Change Detection Boosted by Semi-supervised Contrastive Learning of Semantic Segmentation",
    authors: "Xiuwei Zhang, Yizhe Yang, <strong>Lingyan Ran*</strong>, Liang Chen, Kangwei Wang, Lei Yu, Peng Wang, Yanning Zhang.",
    venue: "④ IEEE Transactions on Geoscience and Remote Sensing, 2024.",
    image: "Papers/24-SCDCL/SCDCL.png",
    website: "https://ieeexplore.ieee.org/document/10510348",
    links: [
      { name: "pdf", url: "Papers/24-SCDCL/SCDCL.pdf" }
    ]
  },
  {
    title: "Improving Reliability of Heterogeneous Change Detection by Sample Synthesis and Knowledge Transfer",
    authors: "Yinghui Xing, Qi Zhang, <strong>Lingyan Ran*</strong>, Xiuwei Zhang, Hanlin Yin, Yanning Zhang.",
    venue: "③ IEEE Transactions on Geoscience and Remote Sensing, 2024.",
    image: "Papers/24-HCD/Unsup.png",
    website: "https://ieeexplore.ieee.org/document/10480439/keywords#keywords",
    links: [
      { name: "pdf", url: "Papers/24-HCD/ICD.pdf" }
    ]
  },
  {
    title: "Hierarchical Shared Architecture Search for Real-time Semantic Segmentation of Remote Sensing Images",
    authors: "Wenna Wang^, <strong>Lingyan Ran^</strong>, Hanlin Yin, Mingjun Sun, Xiuwei Zhang, and Yanning Zhang.",
    venue: "② IEEE Transactions on Geoscience and Remote Sensing, 2024, 62: 1-13.",
    image: "Papers/24-HAS/pic1.png",
    website: "https://ieeexplore.ieee.org/document/10460490",
    links: [
      { name: "pdf", url: "Papers/24-HAS/HAS.pdf" }
    ]
  },
  {
    title: "DTFSeg: A Dynamic Threshold Filtering Method for Semi-Supervised Semantic Segmentation",
    authors: "<strong>Lingyan Ran</strong>, Weiqi Zhan, Yali Li, Xiaoqiang Zhang, Shizhou Zhang.",
    venue: "2023 China Automation Congress (CAC).",
    image: "Papers/23-DTFSeg/cchi2023.png",
    website: "https://ieeexplore.ieee.org/abstract/document/10451534",
    links: [
      { name: "pdf", url: "Papers/23-DTFSeg/cchi2023.pdf" }
    ]
  },
  {
    title: "Optimal Policy Replay: A Simple Method to Reduce Catastrophic Forgetting in Target Incremental Visual Navigation",
    authors: "Xinting Li, Shizhou Zhang, LU Yue, Kerry Dang, <strong>Lingyan Ran</strong>, Peng Wang, Yanning Zhang.",
    venue: "2023 China Automation Congress (CAC).",
    image: "Papers/23-OPR/OPR.png",
    website: "https://ieeexplore.ieee.org/abstract/document/10450433",
    links: [
      { name: "pdf", url: "Papers/23-OPR/OPR.pdf" }
    ]
  },
  {
    title: "Pre-train, Adapt and Detect: Multi-Task Adapter Tuning for Camouflaged Object Detection",
    authors: "Yinghui Xing, Dexuan Kong, Shizhou Zhang, Geng Chen, <strong>Lingyan Ran</strong>, Peng Wang, Yanning Zhang.",
    venue: "arXiv:2307.10685.",
    image: "Papers/23-cod/cod.png",
    website: "https://arxiv.org/abs/2307.10685",
    links: [
      { name: "pdf", url: "Papers/23-cod/cod.pdf" }
    ]
  },
  {
    title: "Progressive Modality-Alignment for Unsupervised Heterogeneous Change Detection",
    authors: "Yinghui Xing, Qi Zhang, <strong>Lingyan Ran*</strong>, Hanlin Yin, Yanning Zhang.",
    venue: "① IEEE Transactions on Geoscience and Remote Sensing, 2023, 61: 1-12.",
    image: "Papers/23-ucd/ucd.jpg",
    website: "https://ieeexplore.ieee.org/document/10177987",
    links: [
      { name: "pdf", url: "Papers/23-ucd/ucd.pdf" }
    ]
  },
  {
    title: "FastICENet: A Real-time and Accurate Semantic Segmentation Model for Aerial Remote Sensing River Ice Image",
    authors: "Xiuwei Zhang, Ziu Zhao, <strong>Lingyan Ran*</strong>, Yinghui Xing, Wenan Wang, Zeze Lan, Hanlin Yin, Houjun He, Qixing Liu, Baosen Zhang, and Yanning Zhang.",
    venue: "Signal Processing, 2023.",
    image: "Papers/23-FastICENet/pic1.png",
    website: "https://www.sciencedirect.com/science/article/abs/pii/S0165168423002244",
    links: [
      { name: "pdf", url: "Papers/23-FastICENet/fasticenet.pdf" }
    ]
  },
  {
    title: "DSC-GraspNet: A Lightweight Convolutional Neural Network for Robotic Grasp Detection",
    authors: "Zhiyang Zhou, Xiaoqiang Zhang, <strong>Lingyan Ran</strong>, Yamin Han and Hongyu Chu",
    venue: "② ICVR, 2023.",
    image: "Papers/23-grasp/grasp.png",
    website: "https://ieeexplore.ieee.org/abstract/document/10169448",
    links: [
      { name: "pdf", url: "Papers/23-grasp/grasp.pdf" }
    ]
  },
  {
    title: "Visual SLAM for Dynamic Environments based on Static Key-points Detection",
    authors: "Liangtao Zhong, Xiaoqiang Zhang, <strong>Lingyan Ran</strong>, Yamin Han and Hongyu Chu",
    venue: "① ICVR, 2023.",
    image: "Papers/23-vslam/vslam.png",
    website: "https://ieeexplore.ieee.org/abstract/document/10169198",
    links: [
      { name: "pdf", url: "Papers/23-vslam/EasyChair-Preprint-10176.pdf" }
    ]
  },
  {
    title: "An Unsupervised Domain Adaption Framework for Aerial Image Semantic Segmentation Based on Curriculum Learning",
    authors: "<strong>Lingyan Ran</strong>, Cheng Ji, Shizhou Zhang, Xiaoqiang Zhang, Yanning Zhang.",
    venue: "2022 7th International Conference on Image, Vision and Computing (ICIVC), Xi’an, China, 2022, pp. 354-359.",
    image: "Papers/22-CL/1.png",
    website: "https://ieeexplore.ieee.org/abstract/document/9886060",
    links: [
      { name: "bibtex", url: "Papers/22-CL/1.txt" },
      { name: "pdf", url: "Papers/22-CL/VC12078.pdf" }
    ]
  },
  {
    title: "Underwater Light Field Camera Calibration Based on Multi-Layer Flat Refractive Model and Multi-Projection-Center Model",
    authors: "Xiaoqiang Zhang, Liangtao Zhong, Qiqi Leng, <strong>Lingyan Ran</strong>, Hongyu Chu.",
    venue: "Acta Optica Sinica, 2022, 42(12): 1215001.",
    image: "Papers/22-underwater/ud1.png",
    website: "https://www.opticsjournal.net/Articles/OJ464114e7568b8c15/Abstract",
    links: [
      { name: "bibtex", url: "Papers/22-underwater/ref.txt" },
      { name: "pdf", url: "Papers/22-underwater/1215001.pdf" }
    ]
  },
  {
    title: "Metric Calibration of Aerial On-Board Multiple Non-overlapping Cameras Based on Visual and Inertial Measurement Data",
    authors: "Xiaoqiang Zhang, Liangtao Zhong, Chao Liang, Hongyu Chu, Yanhua Shao, <strong>Lingyan Ran</strong>",
    venue: "In Chinese Conference on Pattern Recognition and Computer Vision (PRCV), pp. 16-28. Springer, Cham, 2021.",
    image: "Papers/21-Calib/img.png",
    website: "https://link.springer.com/chapter/10.1007/978-3-030-88007-1_2",
    links: [
      { name: "bibtex", url: "Papers/21-Calib/cite.txt" },
      { name: "pdf", url: "Papers/21-Calib/calib.pdf" }
    ]
  },
  {
    title: "Improving visible-thermal ReID with structural common space embedding and part models",
    authors: "<strong>Lingyan Ran</strong>, Yujun Hong, Shizhou Zhang*, Yifei Yang, Yanning Zhang",
    venue: "Pattern Recognition Letters 142 (2021): 25-31.",
    image: "Papers/20-ReID/reid.bmp",
    website: "https://www.sciencedirect.com/science/article/pii/S0167865520304347?dgcid=coauthor",
    links: [
      { name: "bibtex", url: "Papers/20-ReID/reid.txt" },
      { name: "pdf", url: "Papers/20-ReID/reid.pdf" }
    ]
  },
  {
    title: "An Adaptive Viewpoint Transformation Network for 3D Human Pose Estimation",
    authors: "Guoqiang Liang, Xiangping Zhong, <strong>Lingyan Ran*</strong>, Yanning Zhang",
    venue: "Access, 2020.",
    image: "Papers/20-3Dpose/3dpose.png",
    website: "https://ieeexplore.ieee.org/abstract/document/9154716",
    links: []
  },
  {
    title: "EMS-Net: Ensemble of Multiscale Convolutional Neural Networks for Classification of Breast Cancer Histology Images",
    authors: "Zhanbo Yang, <strong>Lingyan Ran</strong>, Shizhou Zhang, Yong Xia and Yanning Zhang",
    venue: "Neurocomputing, 2019.",
    image: "Papers/19-EMS-Net/ems-net.jpg",
    website: "https://www.sciencedirect.com/science/article/pii/S0925231219310872?via%3Dihub",
    links: [
      { name: "bibtex", url: "Papers/19-EMS-Net/emsnet.txt" }
    ]
  },
  {
    title: "MSA-Net: Multiscale Spatial Attention Network for the Classification of Breast Histology Images",
    authors: "Zhanbo Yang, <strong>Lingyan Ran</strong>, Yong Xia and Yanning Zhang",
    venue: "2019 International Conference on Brain-Inspired Cognitive Systems (BICS 2019), Guangzhou, China.",
    image: "Papers/19-MSA-Net/fig1.png",
    website: "Papers/19-MSA-Net/BICS2019_zbyang.pdf",
    links: [
      { name: "bibtex", url: "Papers/19-MSA-Net/msanet.txt" }
    ]
  },
  {
    title: "A Hyperspectral Image Classification Framework with Spatial Pixel Pair Features",
    authors: "<strong>Lingyan Ran</strong>, Yanning Zhang, Wei Wei and Qilin Zhang",
    venue: "③ Sensors 2017, 17, 2421.",
    image: "Papers/17-SPPF/SPPF.png",
    website: "http://www.mdpi.com/1424-8220/17/10/2421",
    links: [
      { name: "Project page", url: "https://hijeffery.github.io/HSI-SPPF/" },
      { name: "bibtex", url: "Papers/17-SPPF/sppf.txt" },
      { name: "Source code", url: "https://github.com/hijeffery/HSI-SPPF/tree/master/code" }
    ]
  },
  {
    title: "Convolutional Neural Network-Based Robot Navigation Using Uncalibrated Spherical Images",
    authors: "<strong>Lingyan Ran</strong>, Yanning Zhang, Qilin Zhang and Tao Yang",
    venue: "② Sensors 2017, 17, 1341.",
    image: "Papers/17-Navi/fig1.png",
    website: "http://www.mdpi.com/1424-8220/17/6/1341",
    links: [
      { name: "Project page", url: "https://hijeffery.github.io/PanoNavi/" },
      { name: "bibtex", url: "Papers/17-Navi/navi.txt" },
      { name: "Source code", url: "https://github.com/hijeffery/PanoNavi/blob/master/navi.zip" }
    ]
  },
  {
    title: "Autonomous Near Ground Quadrone Navigation with Uncalibrated Spherical Images Using Convolutional Neural Networks",
    authors: "<strong>Lingyan Ran</strong>, Yanning Zhang and Tao Yang",
    venue: "Proceedings of the 14th International Conference on Advances in Mobile Computing and Multimedia (MoMM), 2016.",
    image: "Papers/17-Navi/network.png",
    website: "",
    links: []
  },
  {
    title: "Bands Sensitive Convolutional Network for Hyperspectral Image Classification",
    authors: "<strong>Lingyan Ran</strong>, Yanning Zhang, Wei Wei and Tao Yang",
    venue: "Inter. Conf. on Internet Multimedia Computing and Service (ICIMCS), 2016.",
    image: "Papers/16-BsNet/BsNet.png",
    website: "",
    links: []
  },
  {
    title: "Autonomous Wheeled Robot Navigation with Uncalibrated Spherical Images",
    authors: "<strong>Lingyan Ran</strong>, Yanning Zhang, Tao Yang and Peng Zhang",
    venue: "The 4th Chinese Conference on Intelligent Visual Surveillance (IVS), 2016.",
    image: "Papers/17-Navi/various.png",
    website: "",
    links: [
      { name: "bibtex", url: "Papers/17-Navi/ivs2016.txt" }
    ]
  },
  {
    title: "CANNET: Context Aware Nonlocal Convolutional Networks for Semantic Image Segmentation",
    authors: "<strong>Lingyan Ran</strong>, Yanning Zhang and Gang Hua",
    venue: "International Conference on Image Processing (ICIP), 2015, Quebec City, Canada.",
    image: "Papers/15-CanNet/cannet.bmp",
    website: "http://ieeexplore.ieee.org/abstract/document/7351692/",
    links: []
  },
  {
    title: "Compressive Tracking based on Superpixel Segmentation",
    authors: "Ting Chen, Hichem Sahli, Yanning Zhang, Tao Yang and <strong>Lingyan Ran</strong>",
    venue: "Proceedings of the 14th International Conference on Advances in Mobile Computing and Multimedia (MoMM), 2016.",
    image: "Papers/ct.png",
    website: "",
    links: []
  },
  {
    title: "Multiple-Layer Visibility Propagation-Based Synthetic Aperture Imaging through Occlusion",
    authors: "Tao Yang, Jing Li, Jingyi Yu, Yanning Zhang, Wenguang Ma, Xiaomin Tong, Rui Yu and <strong>Lingyan Ran</strong>",
    venue: "① Sensors, 2015.",
    image: "Papers/SIA.jpg",
    website: "",
    links: []
  },
  {
    title: "All-In-Focus Synthetic Aperture Imaging",
    authors: "Tao Yang, Yanning Zhang, Jingyi Yu, Jing Li, Wenguang Ma, Xiaomin Tong, Rui Yu, and <strong>Lingyan Ran</strong>",
    venue: "① European Conference on Computer Vision (ECCV), 2014.",
    image: "Papers/allsai.png",
    website: "",
    links: []
  },
  {
    title: "Simultaneous camera array focus plane estimation and occluded moving object imaging",
    authors: "Tao Yang, Yanning Zhang, Rui Yu, Xiaoqiang Zhang, Ting Chen, <strong>Lingyan Ran</strong> and Zhengxi Song",
    venue: "Image and Vision Computing (IVC), 2014.",
    image: "Papers/ivc2014.png",
    website: "",
    links: []
  },
  {
    title: "Camera Array Synthetic Aperture Focusing and Fusion based Hidden Object Imaging",
    authors: "Tao Yang, Yanning Zhang, Rui Yu, Xiaoqiang Zhang, Ting Chen, <strong>Lingyan Ran</strong> and Zhengxi Song",
    venue: "Sino-foreign-interchange Workshop on Intelligence Science and Intelligent Data Engineering (ISciDE), 2011, Xi'an, China.",
    image: "Papers/iscide.png",
    website: "",
    links: []
  }
];