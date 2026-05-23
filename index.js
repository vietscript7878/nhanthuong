<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hệ Thống Xác Minh Nhận Quà</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #0f1115;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .card {
            text-align: center;
            background: #1a1d24;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.7);
            max-width: 400px;
            width: 100%;
            border: 1px solid #2d323f;
        }
        .icon {
            font-size: 50px;
            margin-bottom: 15px;
        }
        h1 { 
            color: #2ecc71; 
            font-size: 24px;
            margin: 0 0 10px 0; 
        }
        p { 
            color: #9ca3af; 
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 30px; 
        }
        .btn {
            background: linear-gradient(135deg, #2ecc71, #27ae60);
            color: white;
            border: none;
            padding: 16px 30px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
        }
        .btn:hover { 
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(46, 204, 113, 0.5);
        }
        .btn:active {
            transform: translateY(1px);
        }
        .btn:disabled { 
            background: #374151; 
            color: #9ca3af;
            cursor: not-allowed; 
            box-shadow: none;
            transform: none;
        }
        .footer-text {
            margin-top: 20px;
            font-size: 11px;
            color: #4b5563;
        }
    </style>
</head>
<body>

<div class="card">
    <div class="icon">✅</div>
    <h1>Vượt Link Thành Công!</h1>
    <p>Hệ thống đã xác minh bạn hoàn thành nhiệm vụ. Hãy bấm nút dưới đây để gửi yêu cầu cộng tiền vào tài khoản Discord.</p>
    
    <button class="btn" id="claimBtn" onclick="processReward()">NHẬN THƯỞNG NGAY</button>
    
    <div class="footer-text">Mã bảo mật chống lạm dụng đã được đính kèm tự động</div>
</div>

<script>
    // Hàm bóc tách dữ liệu tự động từ URL thanh địa chỉ (?userid=xxx&secure_token=yyy)
    function getParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    function processReward() {
        const userId = getParam('userid');
        const secureToken = getParam('secure_token');
        const button = document.getElementById('claimBtn');

        // KIỂM TRA BẢO MẬT: Nếu link thiếu ID hoặc thiếu Mã bảo mật ngẫu nhiên thì chặn, không cho bấm
        if (!userId || !secureToken) {
            alert("❌ Lỗi hệ thống: Đường link này không hợp lệ hoặc đã bị chỉnh sửa thông tin bảo mật!");
            return;
        }

        // Khóa nút bấm lại ngay lập tức để người dùng không bấm liên tục nhiều lần (Spam)
        button.disabled = true;
        button.innerText = "ĐANG GỬI XÁC MINH...";

        // Đường link Webhook Discord thật của bạn
        const webhookUrl = "https://discord.com/api/webhooks/1507661372471902278/j4cT8FtQUALGpKHRNBAG2aVLr4Up4EcVQOOt91DMHclsF2ZLcxr_GVgmTKM4LnvAkLNj";

        // Gửi dữ liệu an toàn về kênh Discord của bạn dưới dạng Embed xịn
        fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                embeds: [{
                    title: "🔔 YÊU CẦU CỘNG TIỀN (CHỐNG SPAM)",
                    color: 3066993, // Màu xanh lá cây thanh lịch
                    fields: [
                        { name: "👤 Người dùng", value: `<@${userId}>`, inline: true },
                        { name: "🆔 ID Người dùng", value: `\`${userId}\``, inline: true },
                        { name: "🔑 Token bảo mật (Chỉ dùng 1 lần)", value: `\`${secureToken}\`` }
                    ],
                    timestamp: new Date()
                }]
            })
        })
        .then(response => {
            if (response.ok) {
                alert("🎉 Thành công! Hệ thống bảo mật đã ghi nhận lượt vượt link của bạn.");
                button.innerText = "ĐÃ ĐĂNG KÝ NHẬN THƯỞNG";
            } else {
                alert("❌ Có lỗi xảy ra khi truyền dữ liệu về Discord.");
                button.disabled = false;
                button.innerText = "NHẬN THƯỞNG NGAY";
            }
        })
        .catch(err => {
            alert("❌ Lỗi kết nối mạng, vui lòng kiểm tra lại.");
            button.disabled = false;
            button.innerText = "NHẬN THƯỞNG NGAY";
        });
    }
</script>

</body>
</html>
