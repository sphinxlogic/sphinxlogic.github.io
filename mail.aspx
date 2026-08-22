<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Net.Mail" %>

<script language="C#" runat="server">
  protected void Page_Load(object sender, EventArgs e)
  {
    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
    MailMessage mail = new MailMessage();

    mail.From = new MailAddress("postmaster@sphinxlogic.net");
    /*mail.To.Add("jdm7dv@gmail.com");

    mail.Subject = "Test email sent from System.Net.Mail";
    mail.Body = "Mail test";*/
    mail.Headers.Add("Message-Id",
                      String.Format("<{0}@{1}>",
                      Guid.NewGuid().ToString(),
                      "domain.com"));

    SmtpClient smtp = new SmtpClient("m06.internetmailserver.net");    	

    NetworkCredential Credentials = new NetworkCredential("postmaster@sphinxlogic.net", "Okcomputer56?");
    smtp.Credentials = Credentials;
    smtp.EnableSsl = true;
    smtp.Port = 25;
    smtp.Send(mail);
    lblMessage.Text = "Mail Sent";

   
  }
</script>
<html>
<body>
  <form runat="server">
  <asp:panel id="Page1" runat=server>
    <asp:TextBox id="mailToBox" runat="server"></asp:TextBox>
    <asp:TextBox id="mailCCBox" runat="server"></asp:TextBox>
    <asp:TextBox id="mailBCCBox" runat="server"></asp:TextBox>
    <asp:TextBox id="mailSubBox" runat="server"></asp:TextBox>
    <asp:TextBox id="mailBodyBox" runat="server"></asp:TextBox>
  </form>
</body>
</html>