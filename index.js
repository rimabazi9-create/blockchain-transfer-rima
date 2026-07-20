<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>التوقيع الرقمي للمعاملة</title>
    <script src="https://cdn.jsdelivr.net/npm/ethers@6.12.0/dist/ethers.umd.min.js">
    </script>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f0f4f8;
            padding: 2rem 1.5rem;
            color: #0f172a;
            direction: rtl;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            padding: 2.5rem;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
        }
        h1 {
            font-size: 2rem;
            border-bottom: 4px solid #3b82f6;
            padding-bottom: 0.75rem;
            margin-bottom: 1.5rem;
        }
        .sub {
            color: #475569;
            margin-bottom: 2rem;
        }
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin: 2rem 0;
        }
        @media (max-width:700px) {
            .grid-2 {
                grid-template-columns: 1fr;
            }
        }
        .section-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #1e293b;
        }
        .detail {
            margin-bottom: 0.75rem;
            line-height: 1.6;
        }
        .label {
            font-weight: 700;
            color: #475569;
            display: inline-block;
            min-width: 100px;
        }
        .value {
            background: #f8fafc;
            padding: 0.2rem 0.7rem;
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            font-size: 0.85rem;
            word-break: break-all;
        }
        .hash-box {
            background: #0f172a;
            color: #a5f3fc;
            padding: 1.2rem;
            border-radius: 10px;
            font-family: monospace;
            word-break: break-all;
            direction: ltr;
            text-align: left;
            margin-top: 0.5rem;
        }
        .btn-primary {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 14px 32px;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            margin: 15px 0;
        }
        .btn-primary:hover {
            background: #2563eb;
            transform: translateY(-2px);
        }
        .btn-success {
            background: #22c55e;
            color: white;
            border: none;
            padding: 14px 32px;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s;
            margin: 15px 5px;
        }
        .btn-success:hover {
            background: #16a34a;
            transform: translateY(-2px);
        }
        .result-box {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 1.5rem;
            margin-top: 20px;
            display: none;
        }
        .result-box .item {
            margin-bottom: 15px;
        }
        .result-box .item-label {
            font-weight: 700;
            color: #0f172a;
        }
        .result-box .item-value {
            background: #1e293b;
            color: #a5f3fc;
            padding: 12px;
            border-radius: 8px;
            font-family: monospace;
            word-break: break-all;
            direction: ltr;
            text-align: left;
            margin-top: 5px;
            font-size: 0.9rem;
        }
        .status-valid {
            background: #dcfce7;
            border-right: 6px solid #22c55e;
            padding: 1rem;
            border-radius: 8px;
            margin: 10px 0;
        }
        .footer {
            margin-top: 2rem;
            text-align: center;
            color: #94a3b8;
            font-size: 0.85rem;
        }
        .note {
            background: #fef9c3;
            padding: 12px;
            border-radius: 8px;
            margin: 10px 0;
            font-size: 0.95rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📜 توقيع المعاملة الرقمي</h1>
        <p class="sub">هذه الصفحة تحسب <strong>الرسالة (Message)</strong> و <strong>التوقيع (Signature)</strong> لبياناتك باستخدام المفتاح الخاص.</p>

        <!-- عرض البيانات -->
        <div class="grid-2">
            <div>
                <div class="section-title">🏦 البيانات المالية</div>
                <div class="detail"><span class="label">الشركة:</span> Lebenswerk Bau und Boden Brensbach GmbH</div>
                <div class="detail"><span class="label">المبلغ:</span> <strong>4,154,000,000.00 يورو</strong></div>
                <div class="detail"><span class="label">مرجع SWIFT:</span> 20260612MT10365491003919291</div>
                <div class="detail"><span class="label">BIC:</span> DEUTDEDB545</div>
            </div>
            <div>
                <div class="section-title">⛓️ البلوكشين</div>
                <div class="detail"><span class="label">الشبكة:</span> Ethereum Mainnet</div>
                <div class="detail"><span class="label">المحفظة:</span> <span class="value">0xF3d5391839BB5a1Bba15dF173230FFe86FEc6eff</span></div>
                <div class="detail"><span class="label">عقد USDT:</span> <span class="value">0xdac17f958d2ee523a2206206994597c13d831ec7</span></div>
            </div>
        </div>

        <!-- الهاش -->
        <div style="margin-top:10px;"><strong>🔐 بصمة المستند (Message / SHA-256):</strong></div>
        <div class="hash-box" id="hashDisplay">⏳ جارٍ الحساب...</div>

        <!-- أزرار الإجراء -->
        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin: 20px 0;">
            <button class="btn-primary" id="signBtn">✍️ توقيع الرسالة الآن</button>
            <button class="btn-success" id="copyBtn">📋 نسخ التوقيع</button>
        </div>

        <!-- عرض النتيجة (التوقيع) -->
        <div class="result-box" id="resultBox">
            <div class="item">
                <div class="item-label">📄 الرسالة (Message Hex):</div>
                <div class="item-value" id="resultMessage">...</div>
            </div>
            <div class="item">
                <div class="item-label">✍️ التوقيع (Signature Hex):</div>
                <div class="item-value" id="resultSignature">...</div>
            </div>
            <div class="item">
                <div class="item-label">👤 المُوقِّع (Signer Address):</div>
                <div class="item-value" id="resultSigner">...</div>
            </div>
            <div class="status-valid" id="verifyStatus">
                ✅ التحقق: التوقيع صحيح ومطابق للعنوان
            </div>
        </div>

        <div class="note">
            ⚠️ <strong>ملاحظة:</strong> التوقيع يتم حسابه داخل متصفحك باستخدام المفتاح الخاص. المفتاح لا يُرسل إلى أي خادم خارجي.
        </div>

        <div class="footer">
            استضافته Render.com · تم إنشاء التوقيع في المتصفح (Off-chain)
        </div>
    </div>

    <script>
        // -------------------- البيانات الثابتة --------------------
        const DATA = {
            financial: {
                beneficiary: "Lebenswerk Bau und Boden Brensbach GmbH",
                address: "Ludwigsplatz 1, 67059 Ludwigshafen",
                totalAmountEUR: "4,154,000,000.00",
                swiftRef: "20260612MT10365491003919291",
                bic: "DEUTDEDB545",
                bankEmail: "deutsche-bankg@db.com",
                txDate: "2026-06-12"
            },
            blockchain: {
                network: "Ethereum Mainnet",
                chainId: 1,
                defaultWallet: "0xF3d5391839BB5a1Bba15dF173230FFe86FEc6eff",
                masterWallet: "0x5a52E96BAcdaBb82fd05763E25335261B270Efcb",
                usdtContract: "0xdac17f958d2ee523a2206206994597c13d831ec7",
                nodeIP: "162.254.35.81",
                securityAlgorithms: "RSA-2048 · ECDSA · SHA-256"
            },
            signature: {
                signedBy: "0xF3d5391839BB5a1Bba15dF173230FFe86FEc6eff",
                algorithm: "ECDSA"
            }
        };

        // المفتاح الخاص (يُستخدم فقط للتوقيع في المتصفح)
        const PRIVATE_KEY = "1d810943752a2b2f85280a6149da40361600cae79789492431efc4ddf30630b5";
        const EXPECTED_SIGNER = "0xF3d5391839BB5a1Bba15dF173230FFe86FEc6eff";

        let currentMessage = null;
        let currentSignature = null;

        // -------------------- حساب الهاش (الرسالة) --------------------
        async function computeHash() {
            const jsonString = JSON.stringify(DATA, null, 0);
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(jsonString);
            const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }

        // -------------------- توقيع الرسالة --------------------
        async function signMessage() {
            const statusDiv = document.getElementById('resultBox');
            const hashDisplay = document.getElementById('hashDisplay');
            const signBtn = document.getElementById('signBtn');

            try {
                signBtn.disabled = true;
                signBtn.textContent = '⏳ جارٍ التوقيع...';

                // 1. حساب الهاش إذا لم يكن موجوداً
                if (!currentMessage) {
                    currentMessage = await computeHash();
                    hashDisplay.textContent = currentMessage;
                }

                // 2. إنشاء الرسالة بالتنسيق القياسي لإيثيريوم
                const message = ethers.hashMessage(currentMessage);
                // أو نستخدم الطريقة المباشرة: التوقيع على النص الأصلي
                // لكن الطريقة الأفضل هي التوقيع على الهاش مباشرة كـ bytes
                const signingKey = new ethers.SigningKey(PRIVATE_KEY);
                const signatureObj = signingKey.sign(currentMessage);

                // 3. استخراج التوقيع كـ Hex
                currentSignature = signatureObj.serialized;

                // 4. عرض النتيجة
                document.getElementById('resultMessage').textContent = currentMessage;
                document.getElementById('resultSignature').textContent = currentSignature;
                document.getElementById('resultSigner').textContent = EXPECTED_SIGNER;

                // 5. التحقق من صحة التوقيع
                const recovered = ethers.verifyMessage(currentMessage, currentSignature);
                const isValid = (recovered.toLowerCase() === EXPECTED_SIGNER.toLowerCase());

                const verifyDiv = document.getElementById('verifyStatus');
                if (isValid) {
                    verifyDiv.innerHTML = '✅ التحقق: التوقيع صحيح ومطابق للعنوان';
                    verifyDiv.style.borderRightColor = '#22c55e';
                } else {
                    verifyDiv.innerHTML = '❌ التحقق: فشل! المسترد لا يطابق المُوقِّع.';
                    verifyDiv.style.borderRightColor = '#ef4444';
                }

                // إظهار صندوق النتائج
                statusDiv.style.display = 'block';

            } catch (error) {
                alert('❌ حدث خطأ: ' + error.message);
                console.error(error);
            } finally {
                signBtn.disabled = false;
                signBtn.textContent = '✍️ توقيع الرسالة الآن';
            }
        }

        // -------------------- نسخ التوقيع --------------------
        function copySignature() {
            if (!currentSignature) {
                alert('❌ يرجى توقيع الرسالة أولاً.');
                return;
            }
            navigator.clipboard.writeText(currentSignature).then(() => {
                alert('✅ تم نسخ التوقيع إلى الحافظة!');
            }).catch(() => {
                // طريقة احتياطية
                const ta = document.createElement('textarea');
                ta.value = currentSignature;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                ta.remove();
                alert('✅ تم النسخ (طريقة احتياطية).');
            });
        }

        // -------------------- تشغيل عند التحميل --------------------
        window.addEventListener('DOMContentLoaded', async () => {
            // حساب الهاش تلقائياً عند التحميل
            currentMessage = await computeHash();
            document.getElementById('hashDisplay').textContent = currentMessage;

            document.getElementById('signBtn').addEventListener('click', signMessage);
            document.getElementById('copyBtn').addEventListener('click', copySignature);
        });
    </script>
</body>
</html>
