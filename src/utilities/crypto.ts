// import config from "@/config";
import CryptoJS from "crypto-js";

const secretKey =
	"Oc+KrajyPWjEwZVU5Uu7n8NawEAwGmqX2rPylv9CxUmgz6HXhsD9dy2dBp9E8eOB31UIVoiK3phhb+t4lZyPaPPp1JH5HsBvvwtAYfp7Hjp+HWQqr1SO1kSB4z59W0/PeQrucO6Cq+rIphvlomTwfE4U37Xy+8FPTZ7cLxxJ2PWw2hrmDwUOalFQLB5VIC26RPjA3tqD1cNLy+UM/LhadALBrD9ccg55qYE3DIz/a+G2pv5+mKiOj84hyQ3KIaIE0CAsAQ5jcjN+YXr6NIomIaufCdD939Aj4yNp1jD2tpi0S1YAAia+HwkXkERX9s9q7m/ADUj1q0ALSohyUhO1Dw=="; // config.ecryptSecret || process.env.NEXT_ENCRYPTION_SECRET;

// ID
const encryptId = (id: any) =>
	Buffer.from(CryptoJS.AES.encrypt(String(id), secretKey).toString()).toString(
		"base64"
	);

const decryptId = (id: any) =>
	CryptoJS.AES.decrypt(
		Buffer.from(String(id), "base64").toString(),
		secretKey
	).toString(CryptoJS.enc.Utf8);

// X API KEY
const encryptKey = (key: any) =>
	CryptoJS.AES.encrypt(JSON.stringify(key), "Random text", {
		iv: CryptoJS.enc.Utf8.parse("asdfasd"),
	}).toString();

const decryptKey = (key: any, secret: any) => {
	try {
		let bytes = CryptoJS.AES.decrypt(key, secret);
		const decrypted = bytes.toString(CryptoJS.enc.Utf8);
		return decrypted;
	} catch (e) {
		console.log(e);
	}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	encryptId,
	decryptId,
	encryptKey,
	decryptKey,
};
