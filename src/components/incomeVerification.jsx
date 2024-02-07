import "./styles.css";
import React from "react";

// Bob         Sarah        Joe
// Email       test1@argyle.com  test2@argyle.com  test3@argyle.com
// Username    test_1         test_2         test_3
// Password    passgood       passgood       passgood
// Verification code  8081          8082          8083
// Phone number   (800) 900-0010 (800) 900-0020 (800) 900-0030
// Driver's license # D1230010    D1230020    D1230030

export default function IncomeVerification() {
  return (
    <div className="income-verification">
                <p>Verify that your identity and income with Argyle.</p>
      <buton className="arglye-button">Argyle</buton>
    </div>
  );
}
