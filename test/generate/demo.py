import torch
import torch.onnx as onnx
import torchvision.models as models

# 创建一个示例的PyTorch模型（这里使用ResNet作为示例）
model = models.resnet18(pretrained=True)

# 设置模型为评估模式
model.eval()

# 创建一个示例的输入张量
x = torch.randn(1, 3, 224, 224)

# 使用torch.onnx.export将模型导出为ONNX格式
onnx_file_path = "../../third_party/test/onnx/resnet18.onnx"
onnx.export(model, x, onnx_file_path, verbose=True)

print(f"ONNX模型已生成并保存到{onnx_file_path}")