---
author: Ari Gestetner
aliases: 
tags: 
publish: false
date-created: 05-09-2025
last-modified: 07-09-2025
---

# Enhancing diagnosis ensemble deep-learning model for fracture detection using X-ray images

## Abstract

- Mura-v1.1 dataset used
- Ensemble model used 
	- MobileNetV2
	- VGG16
	- InceptionV3
	- ResNet50
- Preprocessed with histogram equalisation 
- Global Average Pooling layer for feature extraction 
- 80:20 training test split
- 92.96% accuracy, 
- 91.62% recall
- 92.14% F1

## Related Work

## Goal  

- Develop an effective methodology for classifying bone X-rays into two categories
	- fracture and non fracture
- Improve accuracy

## Technique

- Ensemble model integrating multiple CNN architectures
	- MobileNetV2
	- InceptionV3
	- VGG16
	- ResNet50
- Pretrained on ImageNet dataset
- Optimised model performance with
	- Fine tuned hyperparams
	- Adjusted network structures, including adding and freezing layers  

![[EnsembleModelStructure.png]]

- Stacked generaliser combines predictions from CNN models
	- Aka meta-model in ensemble learning
	- Uses logistic regression or small neuralnet to refine and blend these predictions
		- Potentially test results of using other binomial link functions or gbm
	- In [[EnsembleModelStructure.png]] the meta-model is trained on the validation set's probability scores
- Each base model is modified to extract specific patterns and cues from the image set

### Modified Vgg16

- Developed by Visual Geometry Group at Oxford
- Known for its implicity and effectiveness
- Achieved top performance in the 2014 ImageNet Challenge with 16 layers
	- 13 conv layers
	- 3 fully connected layers
	- ReLU activation and max-pooling
- Input images standardised to 224x224 px
- 14 million params, fine tuning 15,000  

![[ModifiedVgg16Architecture.png]]
- Enhancements include
	- Global Average Pooling for spatial feature extraction
	- Flatten for preparing feature maps
	- Dropout to mitigate overfitting
- Softmax activation for binary classification
- Optimised over eight epochs with Adam 
	- Learning rate: 0.01
	- binary cross-entropy loss

### Modified InceptionV3

- Developed by Google
- Renowned for its multiscale feature capture
- Enhancements include
	- Inclusion of Global Average Pooling layer for extracting features
	- Dropout layer to avoid overfitting by deactivating neurons during training
	- Tailored output layer designed to cater to specifics of the classification task (whatever that involves)
- Used in model due to its sophisticated inception modules 
	- Effectively captures multiscale features using parallel convolutional filters of different sizes

### Modified MobileNetV2
- 