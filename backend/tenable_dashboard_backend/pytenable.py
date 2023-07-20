from tenable.sc import TenableSC

# Replace these values with your Tenable API access keys
ACCESS_KEY = ""
SECRET_KEY = ""

# Replace this with the address of your SecurityCenter instance
SC_ADDRESS = "SECURITYCENTER_NETWORK_ADDRESS"

# Replace with your SecurityCenter username and password
SC_USERNAME = "SC_USERNAME"
SC_PASSWORD = "SC_PASSWORD"

# The plugin ID for which you want to retrieve the CVSSv3 and Plugin Output
PLUGIN_ID = 113194


def get_cvssv3_and_output(plugin_id):
    try:
        # Create a TenableSC instance and log in
        sc = TenableSC(SC_ADDRESS)
        sc.login(SC_USERNAME, SC_PASSWORD)

        # Fetch the plugin details
        plugin_details = sc.plugins.details(plugin_id)

        # Extract CVSSv3 and Plugin Output fields from the plugin details
        cvssv3 = plugin_details.get('cvssv3', '')
        plugin_output = plugin_details.get('plugin_output', '')

        return cvssv3, plugin_output

    except Exception as e:
        print("Error:", e)
        return None, None


if __name__ == "__main__":
    cvssv3_value, plugin_output_value = get_cvssv3_and_output(PLUGIN_ID)

    if cvssv3_value and plugin_output_value:
        print(f"CVSSv3: {cvssv3_value}")
        print(f"Plugin Output: {plugin_output_value}")
    else:
        print("Plugin details not found or an error occurred.")
